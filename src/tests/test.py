import pandas as pd

# Provided table data
table_data = [
    ['attack', 'hir', 'basic hir', 1, 'operational', 1, 'p-ltk', 1, 'cover', 1],
    ['attack', 'hir', 'basic hir', 1, 'operational', 1, 'p-ltk', 1, 'assult', 1],
    ['attack', 'hir', 'basic hir', 1, 'operational', 1, 'p-ltk', 1, 'HQ ltk', 1],
    ['attack', 'hir', 'basic hir', 1, 'operational', 1, 'alon', 1, 'edge', 1],
    ['attack', 'hir', 'basic hir', 1, 'operational', 1, 'alon', 1, 'ltk', 1],
    ['attack', 'hir', 'basic hir', 1, 'operational', 1, 'alon', 1, 'rtk', 1],
    ['attack', 'hir', 'basic hir', 1, 'operational', 1, 'alon', 1, 'HQ alon', 1],
    ['attack', 'hir', 'basic hir', 1, 'operational', 2, 'edge', 1, 'cover', 1],
    ['attack', 'hir', 'basic hir', 1, 'operational', 2, 'edge', 1, 'assult', 1],
    ['attack', 'hir', 'basic hir', 1, 'operational', 2, 'edge', 1, 'HQ edge', 1],
    ['attack', 'hir', 'basic hir', 1, 'operational', 2, 'p-rtk', 1, 'assult', 1],
    ['attack', 'hir', 'basic hir', 1, 'operational', 2, 'p-rtk', 1, 'rtk', 1],
    ['attack', 'hir', 'basic hir', 1, 'operational', 2, 'p-rtk', 1, 'HQ rtk', 1],
    ['attack', 'hir', 'basic hir', 1, 'operational', 2, 'operational-HQ', 1, 'operational-HQ', 1],
    ['attack', 'hir', 'basic hir', 1, 'operational', 1, '', '', 'htp', 1]
]

# Provided list of levels
levels = ['batt', 'com', 'plat', 'squad']

# Create DataFrame
df = pd.DataFrame(table_data, columns=['subject', 'personal', 'batt', 'batt-id', 'com', 'com-id', 'plat', 'plat-id', 'squad', 'squad-id'])


def latest_same_column_with_id(df, main_columns, id_columns):
    latest_column = None
    for main_col, id_col in zip(main_columns, id_columns):
        combined_col = main_col
        if all(df[main_col] == df[main_col].iloc[0]) and all(df[id_col] == df[id_col].iloc[0]):
            latest_column = combined_col
    return latest_column

def create_hierarchy_tree(df, highest_level, parent=None):
    tree = []
    stack = []
    root_nodes = df[df[highest_level] == df[highest_level].iloc[0]].copy()
    
    for index, row in root_nodes.iterrows():
        node = {}
        node['subject'] = row['subject']
        node['personal'] = row['personal']
        node['head'] = highest_level
        node['id'] = row['{}-id'.format(highest_level.replace('-', '_'))]
        node['name'] = row[highest_level]
        stack.append((node, row))
    
    while stack:
        current_node, current_row = stack.pop()
        children = []
        
        for level in ['batt', 'com', 'plat', 'squad']:
            level_data = df[df[level] == current_row[level]].copy()
            
            for _, row in level_data.iterrows():
                child_node = {}
                child_node['subject'] = row['subject']
                child_node['personal'] = row['personal']
                child_node['head'] = level
                child_node['id'] = row['{}-id'.format(level.replace('-', '_'))]
                child_node['name'] = row[level]
                if parent is not None:
                    child_node['parent'] = parent
                children.append(child_node)
                
            if children:
                current_node['children'] = children
        
        tree.append(current_node)
        stack.extend([(child, current_row) for child in children])
    
    return tree

# Example usage
highest_level = latest_same_column_with_id(df,['batt', 'com', 'plat', 'squad'],['batt-id', 'com-id', 'plat-id', 'squad-id'])
print(highest_level)
tree = create_hierarchy_tree(df, highest_level)
print(tree)

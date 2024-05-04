import pandas as pd

def latest_same_column_with_id(df, main_columns, id_columns):
    latest_column = None
    for main_col, id_col in zip(main_columns, id_columns):
        combined_col = main_col
        if all(df[main_col] == df[main_col].iloc[0]) and all(df[id_col] == df[id_col].iloc[0]):
            latest_column = combined_col
    return latest_column

def create_level_hierarchy_df(df, levels, highest_level):
    level_hierarchy_data = []

    # Find index of highest level column
    highest_level_index = levels.index(highest_level)

    # Iterate over each level from the highest level downwards
    for i in range(highest_level_index, -1, -1):
        level = levels[i]
        parent_level = None
        parent_level_id = None

        # Find parent level
        for j in range(i - 1, -1, -1):
            if df[levels[j]].iloc[0] != '':
                parent_level = df[levels[j]].iloc[0]
                parent_level_id = df[levels[j] + '-id'].iloc[0]
                break

        # Create DataFrame rows for current level
        for index, row in df.iterrows():
            level_value = row[level]
            level_id = row[level + '-id']
            level_hierarchy_data.append([level, level_value, level_id, parent_level, parent_level_id])

            # Update parent level for next iteration
            parent_level = level_value
            parent_level_id = level_id

    # Create DataFrame
    level_hierarchy_df = pd.DataFrame(level_hierarchy_data, columns=['Level', 'Value', 'Value-ID', 'Parent Value', 'Parent Value-ID'])
    return level_hierarchy_df

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

# Determine highest level
highest_level = latest_same_column_with_id(df, levels, [level + '-id' for level in levels])

# Create level hierarchy DataFrame
level_hierarchy_df = create_level_hierarchy_df(df, levels, highest_level)

# Display the result
print(level_hierarchy_df)

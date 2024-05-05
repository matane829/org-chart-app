import pandas as pd

def transform_org_chart(df):
    org_structure = {}
    
    # Iterate over rows to build the organizational structure dictionary
    for index, row in df.iterrows():
        id_ = row['id']
        level1 = row['level 1']
        level2 = row['level 2']
        level3 = row['level 3']
        level4 = row.get('level 4', 'none')  # Get level 4 or default to 'none'
        level5 = row.get('level 5', 'none')  # Get level 5 or default to 'none'
        
        # Determine name based on the lowest non-'none' level
        if level5 != 'none':
            name = level5
        elif level4 != 'none':
            name = level4
        elif level3 != 'none':
            name = level3
        elif level2 != 'none':
            name = level2
        else:
            name = level1
        
        # Determine father_id
        if level5 != 'none':
            father_id = level4
        elif level4 != 'none':
            father_id = level3
        elif level3 != 'none':
            father_id = level2
        elif level2 != 'none':
            father_id = level1
        else:
            father_id = None
        
        # Store the relationship in the dictionary
        org_structure[id_] = {
            'father_id': father_id,
            'name': name
        }
    
    # Convert the organizational structure dictionary into DataFrame
    transformed_df = pd.DataFrame(org_structure).transpose().reset_index()
    transformed_df.columns = ['id', 'father_id', 'name']
    
    return transformed_df

# Example usage:
# Assuming df is your original DataFrame
df = pd.DataFrame({
    'id': [1, 2, 3, 4, 5, 6],
    'level 1': ['ceo', 'ceo', 'ceo', 'ceo', 'ceo','ceo'],
    'level 2': ['none', 'cco', 'cco', 'cto', 'cto','cto'],
    'level 3': ['none', 'none', 'hhr', 'none', 'hhr','none'],
    'level 4': ['none', 'none', 'none', 'none', 'h1','h3'],
    'level 5': ['none', 'none', 'none', 'none','h2','none'],
    'lvl': ['none', 'none', 'none', 'none','none','none']
})

result_df = transform_org_chart(df)
print(result_df)

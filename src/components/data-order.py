import pandas as pd

def latest_same_column(df, columns):
    for col in reversed(columns):
        if df[col].nunique() == 1:
            return col
    return None

# Example usage
data = {
    'subject': ['attack'] * 15,
    'personal': ['hir'] * 15,
    'batt': ['basic hir'] * 15,
    'batt-id': [1] * 15,
    'com': ['operational'] * 15,
    'com-id': [1] * 7 + [2] * 8,
    'plat': ['p-ltk', 'p-ltk', 'p-ltk', 'alon', 'alon', 'alon', 'alon', 'edge', 'edge', 'edge', 'p-rtk', 'p-rtk', 'p-rtk', 'operational-HQ', None],
    'plat-id': [1] * 15 ,
    'squad': ['cover', 'assult', 'HQ ltk', 'edge', 'ltk', 'rtk', 'HQ alon', 'cover', 'assult', 'HQ edge', 'assult', 'rtk', 'HQ rtk', 'operational-HQ', 'htp'],
    'squad-id': [1] * 15
}

df = pd.DataFrame(data)

def generate_result_df(df, latest_column):
    # Extract column name and level
    column_name, level, s = latest_column.split('-')
    
    # Get the index of the latest column
    latest_index = df.columns.get_loc(column_name)
    
    # Get the list of columns starting from the latest column
    columns_to_process = ['batt', 'com', 'plat', 'squad']
    
    # Initialize a list to store rows for the result DataFrame
    result_rows = []
    
    # Initialize variables to store parent name and id
    parent_name = None
    parent_id = None
    
    # Iterate over each row in the DataFrame
    for index, row in df.iterrows():
        for col in columns_to_process:
            # Extract id and name
            value_id = row[col + '-id']
            value_name = row[col]
            
            # Determine parent name and parent id
            if col == level:
                parent_name = value_name
                parent_id = value_id
            
            # Append a row to the result list
            result_rows.append({'id': index + 1, 'name': value_name, 'name-id': value_id, 'level': col, 'parent': parent_name, 'parent-id': parent_id})
    
    # Create DataFrame from the result list
    result_df = pd.DataFrame(result_rows)
    return result_df




# Creating an empty DataFrame
res_df = pd.DataFrame(columns=['id', 'parentId', 'name', 'parentName', 'level'])

# Displaying the empty DataFrame
print(df)


# latest_same = latest_same_column(df, ['batt', 'com', 'plat', 'squad'])
# print("Latest same column:", latest_same)


import pandas as pd

def latest_same_column_with_id(df, main_columns, id_columns):
    latest_column = None
    for main_col, id_col in zip(main_columns, id_columns):
        combined_col = main_col + '-' + id_col
        if all(df[main_col] == df[main_col].iloc[0]) and all(df[id_col] == df[id_col].iloc[0]):
            latest_column = combined_col
    return latest_column


latest_same = latest_same_column_with_id(df, ['batt', 'com', 'plat', 'squad'], ['batt-id', 'com-id', 'plat-id', 'squad-id'])
print("Latest same column with ID:", latest_same)

result_df = generate_result_df(df, latest_same)
print(result_df)


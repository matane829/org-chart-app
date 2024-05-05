def tree_to_table(tree, parent=None, level=None):
    if level is None:
        level = []

    table = []
    for node in tree:
        table.append({
            'id': node['name'],
            'parentId': parent,
            'level': node['head']
        })
        if 'children' in node:
            level.append(node['head'])
            table.extend(tree_to_table(node['children'], node['name'], level))
            level.pop()
    return table

# Example usage:
hierarchy_tree = [
    {
      "head": "mahlaka",
      "id": 1,
      "name": "mahlaka first",
      "children": [
        {
          "head": "class",
          "id": 1,
          "name": "first",
          "children": [
            {
              "head": "subclass",
              "id": 1,
              "name": "subfirst",
              "children": [
                {
                  "head": "subsubclass",
                  "id": 1,
                  "name": "subsubfirst"
                },
                {
                  "head": "subsubclass",
                  "id": 2,
                  "name": "subsubsecond"
                }
              ]
            },
            {
              "head": "subclass",
              "id": 2,
              "name": "subsecond"
            }
          ]
        },
        {
          "head": "class",
          "id": 2,
          "name": "second",
          "children": [
            {
              "head": "subclass",
              "id": 3,
              "name": "subthird"
            },
            {
              "head": "subclass",
              "id": 4,
              "name": "subfourth"
            }
          ]
        }
      ]
    }
]
>>>>>>> 02f384df0d6d8161bd2c25ca334d6b14745f287e

table = tree_to_table(hierarchy_tree)
for row in table:
    print(row)

import { FlatTreeControl } from '@angular/cdk/tree';
import { Component } from '@angular/core';
import { MatTreeFlattener, MatTreeFlatDataSource } from '@angular/material/tree';

interface TreeNode {
  name: string;
  children?: TreeNode[];
}

// Flat tree node with expandable and level information
interface FlatTreeNode {
  expandable: boolean;
  name: string;
  level: number;
}

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.css']
})
export class TreeComponent {

  sendData = {
    name: 'Arpit',
    };

  treeControl = new FlatTreeControl<FlatTreeNode>(
    node => node.level,
    node => node.expandable
  );

  treeFlattener = new MatTreeFlattener(
    (node: TreeNode, level: number) => {
      return {
        expandable: !!node.children && node.children.length > 0,
        name: node.name,
        level: level,
      };
    },
    node => node.level,
    node => node.expandable,
    node => node.children
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor() {
    // Replace this with your actual data source
    const treeData: TreeNode[] = [
      {
        name: 'Node 1',
        children: [
          { name: 'Child 1' },
          { name: 'Child 2' }
        ]
      },
      {
        name: 'Node 2',
        children: [
          { name: 'Child 3' },
          { name: 'Child 4' }
        ]
      },
      {
        name: 'Node 3',
        children: [
          { name: 'Child 5' },
          { name: 'Child 6' }
        ]
      }
    ];

    this.dataSource.data = treeData;
  }

  // Function to check if a node has children
  hasChild = (_: number, node: FlatTreeNode) => node.expandable;


}

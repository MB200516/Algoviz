export const algorithms = {
  'bubble-sort': {
    id: 'bubble-sort',
    name: 'Bubble Sort',
    category: 'Sorting',
    difficulty: 'Easy',
    description: 'A simple sorting algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order. The pass through the list is repeated until the list is sorted.',
    timeComplexity: {
      best: 'O(n)',
      average: 'O(n²)',
      worst: 'O(n²)'
    },
    spaceComplexity: 'O(1)',
    applications: [
      'Educational purposes',
      'Small datasets',
      'Nearly sorted data'
    ]
  },
  'quick-sort': {
    id: 'quick-sort',
    name: 'Quick Sort',
    category: 'Sorting',
    difficulty: 'Medium',
    description: 'An efficient, divide-and-conquer sorting algorithm. It works by selecting a pivot element and partitioning the array around the pivot, then recursively sorting the sub-arrays.',
    timeComplexity: {
      best: 'O(n log n)',
      average: 'O(n log n)',
      worst: 'O(n²)'
    },
    spaceComplexity: 'O(log n)',
    applications: [
      'General-purpose sorting',
      'Large datasets',
      'In-place sorting needed'
    ]
  },
  'merge-sort': {
    id: 'merge-sort',
    name: 'Merge Sort',
    category: 'Sorting',
    difficulty: 'Medium',
    description: 'A stable, divide-and-conquer sorting algorithm that divides the input array into two halves, recursively sorts them, and then merges the two sorted halves.',
    timeComplexity: {
      best: 'O(n log n)',
      average: 'O(n log n)',
      worst: 'O(n log n)'
    },
    spaceComplexity: 'O(n)',
    applications: [
      'Stable sorting required',
      'External sorting',
      'Linked lists'
    ]
  },
  'binary-search': {
    id: 'binary-search',
    name: 'Binary Search',
    category: 'Searching',
    difficulty: 'Easy',
    description: 'An efficient algorithm for finding an item in a sorted array by repeatedly dividing the search interval in half. It compares the target value to the middle element of the array.',
    timeComplexity: {
      best: 'O(1)',
      average: 'O(log n)',
      worst: 'O(log n)'
    },
    spaceComplexity: 'O(1)',
    applications: [
      'Searching in sorted arrays',
      'Dictionary lookups',
      'Database indexing'
    ]
  },
  'linear-search': {
    id: 'linear-search',
    name: 'Linear Search',
    category: 'Searching',
    difficulty: 'Easy',
    description: 'A simple search algorithm that checks every element in the list sequentially until the target element is found or the end of the list is reached.',
    timeComplexity: {
      best: 'O(1)',
      average: 'O(n)',
      worst: 'O(n)'
    },
    spaceComplexity: 'O(1)',
    applications: [
      'Unsorted data',
      'Small datasets',
      'Simple implementations'
    ]
  },
  'bfs': {
    id: 'bfs',
    name: 'Breadth-First Search',
    category: 'Graph',
    difficulty: 'Medium',
    description: 'A graph traversal algorithm that explores all vertices at the present depth before moving to vertices at the next depth level. Uses a queue data structure.',
    timeComplexity: {
      best: 'O(V + E)',
      average: 'O(V + E)',
      worst: 'O(V + E)'
    },
    spaceComplexity: 'O(V)',
    applications: [
      'Shortest path in unweighted graphs',
      'Level-order traversal',
      'Social network connections'
    ]
  },
  'dfs': {
    id: 'dfs',
    name: 'Depth-First Search',
    category: 'Graph',
    difficulty: 'Medium',
    description: 'A graph traversal algorithm that explores as far as possible along each branch before backtracking. Uses a stack data structure or recursion.',
    timeComplexity: {
      best: 'O(V + E)',
      average: 'O(V + E)',
      worst: 'O(V + E)'
    },
    spaceComplexity: 'O(V)',
    applications: [
      'Topological sorting',
      'Detecting cycles',
      'Path finding'
    ]
  },
  'dijkstra': {
    id: 'dijkstra',
    name: 'Dijkstra\'s Algorithm',
    category: 'Graph',
    difficulty: 'Hard',
    description: 'A graph search algorithm that finds the shortest path between nodes in a weighted graph. Works with non-negative edge weights.',
    timeComplexity: {
      best: 'O((V + E) log V)',
      average: 'O((V + E) log V)',
      worst: 'O(V²)'
    },
    spaceComplexity: 'O(V)',
    applications: [
      'GPS navigation',
      'Network routing',
      'Social networks'
    ]
  },
  'stack': {
    id: 'stack',
    name: 'Stack Operations',
    category: 'Data Structure',
    difficulty: 'Easy',
    description: 'A linear data structure that follows the Last-In-First-Out (LIFO) principle. Elements are added and removed from the same end called the top.',
    timeComplexity: {
      best: 'O(1)',
      average: 'O(1)',
      worst: 'O(1)'
    },
    spaceComplexity: 'O(n)',
    applications: [
      'Function call management',
      'Undo operations',
      'Expression evaluation'
    ]
  },
  'queue': {
    id: 'queue',
    name: 'Queue Operations',
    category: 'Data Structure',
    difficulty: 'Easy',
    description: 'A linear data structure that follows the First-In-First-Out (FIFO) principle. Elements are added at the rear and removed from the front.',
    timeComplexity: {
      best: 'O(1)',
      average: 'O(1)',
      worst: 'O(1)'
    },
    spaceComplexity: 'O(n)',
    applications: [
      'Task scheduling',
      'Breadth-first search',
      'Buffer management'
    ]
  }
};

export const codeTemplates = {
  'bubble-sort': {
    python: `def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        for j in range(0, n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
    return arr

arr = [64, 34, 25, 12, 22, 11, 90]
print(bubble_sort(arr))`,
    java: `public class BubbleSort {
    public static void bubbleSort(int[] arr) {
        int n = arr.length;
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n - i - 1; j++) {
                if (arr[j] > arr[j + 1]) {
                    int temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                }
            }
        }
    }
}`,
    cpp: `#include <iostream>
using namespace std;

void bubbleSort(int arr[], int n) {
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                swap(arr[j], arr[j + 1]);
            }
        }
    }
}`
  },
  'quick-sort': {
    python: `def quick_sort(arr):
    if len(arr) <= 1:
        return arr
    pivot = arr[len(arr) // 2]
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]
    return quick_sort(left) + middle + quick_sort(right)

arr = [64, 34, 25, 12, 22, 11, 90]
print(quick_sort(arr))`,
    java: `public class QuickSort {
    public static void quickSort(int[] arr, int low, int high) {
        if (low < high) {
            int pi = partition(arr, low, high);
            quickSort(arr, low, pi - 1);
            quickSort(arr, pi + 1, high);
        }
    }
    
    private static int partition(int[] arr, int low, int high) {
        int pivot = arr[high];
        int i = low - 1;
        for (int j = low; j < high; j++) {
            if (arr[j] < pivot) {
                i++;
                int temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
            }
        }
        int temp = arr[i + 1];
        arr[i + 1] = arr[high];
        arr[high] = temp;
        return i + 1;
    }
}`,
    cpp: `#include <iostream>
using namespace std;

int partition(int arr[], int low, int high) {
    int pivot = arr[high];
    int i = low - 1;
    for (int j = low; j < high; j++) {
        if (arr[j] < pivot) {
            i++;
            swap(arr[i], arr[j]);
        }
    }
    swap(arr[i + 1], arr[high]);
    return i + 1;
}

void quickSort(int arr[], int low, int high) {
    if (low < high) {
        int pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}`
  }
};

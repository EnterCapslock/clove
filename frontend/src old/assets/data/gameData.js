const gameData = {
  "topic1": {
    "subtopic1": {
      "code_completion": [
        {
          id: 1,
          question: "Fill in the blank to print 'Hello, World!' in Python.",
          code: 'print(__)',
          answer: '"Hello, World!"'
        },
        {
          id: 2,
          question: "Complete the function to return the sum of two numbers.",
          code: 'def add(a, b):\n    return __',
          answer: "a + b"
        }
      ],
      "code_tracing": [
        {
          id: 1,
          question: "What will be the output?",
          code: 'x = 5\ny = x * 2\nprint(y)',
          answer: "10"
        },
        {
          id: 2,
          question: "Predict the output of this Python code.",
          code: 'def greet():\n    return "Hello, World!"\n\nprint(greet())',
          answer: "Hello, World!"
        }
      ],
      "code_fixer": [
        {
          id: 1,
          question: "Fix the syntax error in the given code.",
          code: 'print "Hello, World!"',
          fixedCode: 'print("Hello, World!")'
        },
        {
          id: 2,
          question: "Fix the indentation error in this Python function.",
          code: 'def greet():\nprint("Hello")',
          fixedCode: 'def greet():\n    print("Hello")'
        }
      ]
    }
  }
};

export default gameData;

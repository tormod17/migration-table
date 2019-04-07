var c = {
  "dataType": "boolean",
  "lhs": {
    "dataType": "boolean",
    "type": "boolean-literal",
    "value": true
  },
  "rhs": {
    "dataType": "boolean",
    "lhs": {
      "dataType": "boolean",
      "type": "not",
      "value": {
        "dataType": "boolean",
        "name": "campaigns/byId/100239/isCapped",
        "type": "variable"
      }
    },
    "rhs": {
      "dataType": "boolean",
      "lhs": {
        "dataType": "boolean",
        "lhs": {
          "dataType": "boolean",
          "query": {
            "dataType": "string",
            "type": "string-literal",
            "value": "confirmation"
          },
          "string": {
            "dataType": "string",
            "name": "currentUrl",
            "type": "variable"
          },
          "type": "contains"
        },
        "rhs": {
          "dataType": "boolean",
          "query": {
            "dataType": "string",
            "type": "string-literal",
            "value": "confirmation"
          },
          "string": {
            "dataType": "string",
            "name": "currentUrl",
            "type": "variable"
          },
          "type": "contains"
        },
        "type": "or"
      },
      "rhs": {
        "dataType": "boolean",
        "lhs": {
          "dataType": "boolean",
          "type": "not",
          "value": {
            "dataType": "boolean",
            "query": {
              "dataType": "string",
              "type": "string-literal",
              "value": "sailings"
            },
            "string": {
              "dataType": "string",
              "name": "currentUrl",
              "type": "variable"
            },
            "type": "contains"
          }
        },
        "rhs": {
          "dataType": "boolean",
          "query": {
            "dataType": "string",
            "type": "string-literal",
            "value": "Login"
          },
          "string": {
            "dataType": "string",
            "name": "entity/string/logged-in-status.logged-in-status",
            "type": "variable"
          },
          "type": "contains"
        },
        "type": "and"
      },
      "type": "and"
    },
    "type": "and"
  },
  "type": "and"
}

 
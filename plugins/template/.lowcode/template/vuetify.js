export default {
  id: 'vuetify',
  title: 'Vuetify Demo',
  schema: {
    "_id": "95f33fdce2f75700",
    "is": "Page",
    "state": {
      "count": 0,
      "drawer": {
        "value": false
      },
      "tabs": {
        "value": "0"
      },
      "list": {
        "value": "2"
      },
      "select": {
        "disabled": false,
        "chips": false,
        "multiple": false
      },
      "radios": {
        "inline": true
      },
      "checkbox": {
        "value": [
          "primary",
          "wraning"
        ],
        "value2": true
      },
      "switch": {
        "value": true
      },
      "slider": {
        "values": [
          10,
          30
        ]
      },
      "chips": {
        "value": "1",
        "values": [
          "Work",
          "Vacation"
        ]
      }
    },
    "children": [
      {
        "is": "v-layout",
        "style": {
          "height": "100%"
        },
        "children": [
          {
            "is": "v-app-bar",
            "elevation": 8,
            "children": {
              "prepend": {
                "children": [
                  {
                    "is": "v-btn",
                    "children": [
                      {
                        "is": "uno-icon",
                        "src": "https://api.iconify.design/mdi:menu.svg",
                        "_id": "e44413153bd79905",
                        "style": {
                          "width": "24px",
                          "height": "24px"
                        }
                      }
                    ],
                    "_id": "e44413153bd79902",
                    "icon": true,
                    "onClick": "{{(e) => {\n  state.drawer.value = true\n}}}"
                  }
                ],
                "_id": "95f33fdce2f75704"
              },
              "title": {
                "children": [
                  {
                    "is": "span",
                    "children": "Title",
                    "_id": "95f33fdce2f75709"
                  }
                ],
                "_id": "95f33fdce2f75705"
              },
              "append": {
                "children": [
                  {
                    "is": "v-btn",
                    "children": [
                      {
                        "is": "uno-icon",
                        "src": "https://api.iconify.design/mdi:dots-vertical.svg",
                        "_id": "e44413153bd7990c",
                        "style": {
                          "width": "24px",
                          "height": "24px"
                        }
                      }
                    ],
                    "_id": "e44413153bd7990a",
                    "icon": true
                  }
                ],
                "_id": "95f33fdce2f75706"
              },
              "extension": {
                "children": [],
                "_id": "95f33fdce2f75707"
              }
            },
            "_id": "95f33fdce2f75702"
          },
          {
            "is": "v-bottom-navigation",
            "children": [
              {
                "is": "v-btn",
                "children": [
                  {
                    "is": "v-icon",
                    "icon": "mdi-widgets",
                    "_id": "410ae55d3f6a9905"
                  },
                  {
                    "is": "span",
                    "children": "Components",
                    "_id": "410ae55d3f6a9906",
                    "style": {}
                  }
                ],
                "_id": "410ae55d3f6a9902",
                "style": {
                  "flex": "1 0"
                }
              },
              {
                "is": "v-btn",
                "children": [
                  {
                    "is": "v-icon",
                    "icon": "mdi-file-document-multiple",
                    "_id": "410ae55d3f6a9907"
                  },
                  {
                    "is": "span",
                    "children": "Forms",
                    "_id": "410ae55d3f6a9908"
                  }
                ],
                "_id": "410ae55d3f6a9903",
                "style": {
                  "flex": "1 0"
                }
              },
              {
                "is": "v-btn",
                "children": [
                  {
                    "is": "v-icon",
                    "icon": "mdi-apple-icloud",
                    "_id": "410ae55d3f6a9909"
                  },
                  {
                    "is": "span",
                    "children": "Api",
                    "_id": "410ae55d3f6a990a"
                  }
                ],
                "_id": "410ae55d3f6a9904",
                "style": {
                  "flex": "1 0"
                }
              }
            ],
            "_id": "410ae55d3f6a9901",
            "color": "primary",
            "mandatory": true,
            "mode": "shift"
          },
          {
            "is": "v-main",
            "children": [
              {
                "is": "v-expansion-panels",
                "children": [
                  {
                    "is": "v-expansion-panel",
                    "children": [
                      {
                        "is": "v-expansion-panel-title",
                        "children": {
                          "default": {
                            "scope": "$panel",
                            "children": [
                              {
                                "is": "uno-icon",
                                "src": "https://api.iconify.design/iconoir:mouse-button-left.svg",
                                "_id": "d695ffb4ed696802",
                                "style": {
                                  "width": "24px",
                                  "height": "24px",
                                  "marginRight": "12px"
                                }
                              },
                              {
                                "is": "span",
                                "children": "Button",
                                "_id": "c8ab828199239d08",
                                "style": {}
                              }
                            ],
                            "_id": "c8ab828199239d07"
                          }
                        },
                        "_id": "c8ab828199239d05"
                      },
                      {
                        "is": "v-expansion-panel-text",
                        "children": [
                          {
                            "is": "div",
                            "children": [
                              {
                                "is": "v-btn",
                                "children": [
                                  {
                                    "is": "span",
                                    "children": "Default",
                                    "_id": "75e036b47287370e"
                                  }
                                ],
                                "_id": "75e036b47287370d"
                              },
                              {
                                "is": "v-btn",
                                "children": [
                                  {
                                    "is": "span",
                                    "children": "Text",
                                    "_id": "75e036b472873711"
                                  }
                                ],
                                "_id": "75e036b472873712",
                                "variant": "text"
                              },
                              {
                                "is": "v-btn",
                                "children": [
                                  {
                                    "is": "span",
                                    "children": "Tonal",
                                    "_id": "75e036b472873717"
                                  }
                                ],
                                "_id": "75e036b472873718",
                                "variant": "tonal"
                              },
                              {
                                "is": "v-btn",
                                "children": [
                                  {
                                    "is": "span",
                                    "children": "Outlined",
                                    "_id": "75e036b472873715"
                                  }
                                ],
                                "_id": "75e036b472873716",
                                "variant": "outlined"
                              },
                              {
                                "is": "v-btn",
                                "children": [
                                  {
                                    "is": "span",
                                    "children": "Plain",
                                    "_id": "75e036b472873713"
                                  }
                                ],
                                "_id": "75e036b472873714",
                                "variant": "plain"
                              },
                              {
                                "is": "v-btn",
                                "children": [
                                  {
                                    "is": "span",
                                    "children": "Block & Border & Rounded & Small",
                                    "_id": "4b8938a3b2c60201"
                                  }
                                ],
                                "_id": "4b8938a3b2c60202",
                                "block": true,
                                "border": true,
                                "rounded": "xl",
                                "size": "small"
                              },
                              {
                                "is": "v-btn",
                                "children": [
                                  {
                                    "is": "v-icon",
                                    "_id": "4b8938a3b2c60205",
                                    "icon": "mdi-account"
                                  }
                                ],
                                "_id": "4b8938a3b2c60204",
                                "icon": true,
                                "size": "x-small"
                              },
                              {
                                "is": "v-btn",
                                "children": [
                                  {
                                    "is": "v-icon",
                                    "_id": "4b8938a3b2c6020a",
                                    "icon": "mdi-plus"
                                  }
                                ],
                                "_id": "4b8938a3b2c6020b",
                                "icon": true,
                                "size": "small"
                              },
                              {
                                "is": "v-btn",
                                "children": [
                                  {
                                    "is": "v-icon",
                                    "_id": "4b8938a3b2c60208",
                                    "icon": "$vuetify"
                                  }
                                ],
                                "_id": "4b8938a3b2c60209",
                                "icon": true
                              },
                              {
                                "is": "v-btn",
                                "children": [
                                  {
                                    "is": "v-icon",
                                    "_id": "4b8938a3b2c60206",
                                    "icon": "mdi-open-in-new"
                                  }
                                ],
                                "_id": "4b8938a3b2c60207",
                                "icon": true,
                                "size": "x-large"
                              }
                            ],
                            "_id": "75e036b47287370c",
                            "style": {
                              "display": "flex",
                              "gap": "12px 12px",
                              "flexWrap": "wrap"
                            }
                          }
                        ],
                        "_id": "c8ab828199239d06"
                      }
                    ],
                    "_id": "c8ab828199239d04"
                  },
                  {
                    "is": "v-expansion-panel",
                    "children": [
                      {
                        "is": "v-expansion-panel-title",
                        "children": {
                          "default": {
                            "scope": "$panel",
                            "children": [
                              {
                                "is": "uno-icon",
                                "src": "https://api.iconify.design/solar:text-field-focus-broken.svg",
                                "_id": "717d18cad19f1801",
                                "style": {
                                  "width": "24px",
                                  "height": "24px",
                                  "marginRight": "12px"
                                }
                              },
                              {
                                "is": "span",
                                "children": "Input",
                                "_id": "4a6ff6a96c0c3a01"
                              }
                            ],
                            "_id": "4a6ff6a96c0c3a02"
                          }
                        },
                        "_id": "4a6ff6a96c0c3a03"
                      },
                      {
                        "is": "v-expansion-panel-text",
                        "children": [
                          {
                            "is": "div",
                            "children": [
                              {
                                "is": "v-text-field",
                                "clearable": true,
                                "label": "Filled",
                                "_id": "4a6ff6a96c0c3a23",
                                "prefix": "￥",
                                "placeholder": "1,000",
                                "hint": "Hint",
                                "autofocus": true
                              },
                              {
                                "is": "v-text-field",
                                "clearable": true,
                                "label": "Solo Filled",
                                "_id": "4a6ff6a96c0c3a28",
                                "variant": "solo-filled",
                                "prefix": "￥",
                                "placeholder": "1,000",
                                "rounded": "lg",
                                "messages": "Messages"
                              },
                              {
                                "is": "v-text-field",
                                "clearable": true,
                                "label": "Underlined",
                                "_id": "4a6ff6a96c0c3a2a",
                                "variant": "underlined",
                                "prefix": "￥",
                                "placeholder": "1,000"
                              }
                            ],
                            "_id": "4a6ff6a96c0c3a22",
                            "style": {
                              "display": "grid",
                              "gridTemplateColumns": "repeat(3, minmax(0, 1fr))",
                              "gap": "12px 24px"
                            }
                          }
                        ],
                        "_id": "4a6ff6a96c0c3a19"
                      }
                    ],
                    "_id": "4a6ff6a96c0c3a1a"
                  },
                  {
                    "is": "v-expansion-panel",
                    "children": [
                      {
                        "is": "v-expansion-panel-title",
                        "children": {
                          "default": {
                            "scope": "$panel",
                            "children": [
                              {
                                "is": "uno-icon",
                                "src": "https://api.iconify.design/mdi:calendar.svg",
                                "_id": "b6d2da7d9d433411",
                                "style": {
                                  "width": "24px",
                                  "height": "24px",
                                  "marginRight": "12px"
                                }
                              },
                              {
                                "is": "span",
                                "children": "Date Input",
                                "_id": "b6d2da7d9d433412"
                              }
                            ],
                            "_id": "b6d2da7d9d433413"
                          }
                        },
                        "_id": "b6d2da7d9d433414"
                      },
                      {
                        "is": "v-expansion-panel-text",
                        "children": [
                          {
                            "is": "div",
                            "children": [
                              {
                                "is": "v-date-input",
                                "label": "Label",
                                "clearable": true,
                                "prependIcon": "",
                                "_id": "53d98fd689073101"
                              }
                            ],
                            "_id": "b6d2da7d9d433415",
                            "style": {
                              "display": "flex",
                              "gap": "12px 12px",
                              "flexDirection": "column"
                            }
                          }
                        ],
                        "_id": "b6d2da7d9d433416"
                      }
                    ],
                    "_id": "b6d2da7d9d433417"
                  },
                  {
                    "is": "v-expansion-panel",
                    "children": [
                      {
                        "is": "v-expansion-panel-title",
                        "children": {
                          "default": {
                            "scope": "$panel",
                            "children": [
                              {
                                "is": "uno-icon",
                                "src": "https://api.iconify.design/mdi:form-select.svg",
                                "_id": "d695ffb4ed696803",
                                "style": {
                                  "width": "24px",
                                  "height": "24px",
                                  "marginRight": "12px"
                                }
                              },
                              {
                                "is": "span",
                                "children": "Select",
                                "_id": "4a6ff6a96c0c3a1b"
                              }
                            ],
                            "_id": "4a6ff6a96c0c3a1c"
                          }
                        },
                        "_id": "4a6ff6a96c0c3a1d"
                      },
                      {
                        "is": "v-expansion-panel-text",
                        "children": [
                          {
                            "is": "div",
                            "children": [
                              {
                                "is": "v-checkbox",
                                "hideDetails": "auto",
                                "valueComparator": "{{(a, b) => a == b}}",
                                "children": {
                                  "label": {
                                    "children": [
                                      {
                                        "is": "span",
                                        "children": "Disabled",
                                        "_id": "56d79f16b07cc502"
                                      }
                                    ],
                                    "_id": "56d79f16b07cc503"
                                  }
                                },
                                "_id": "56d79f16b07cc504",
                                "modelValue": "{{state.select.disabled}}",
                                "onUpdate:modelValue": "{{(v) => {\n  state.select.disabled = v\n}}}",
                                "density": "compact"
                              },
                              {
                                "is": "v-checkbox",
                                "hideDetails": "auto",
                                "valueComparator": "{{(a, b) => a == b}}",
                                "children": {
                                  "label": {
                                    "children": [
                                      {
                                        "is": "span",
                                        "children": "Multiple",
                                        "_id": "f0ee8249946e6403"
                                      }
                                    ],
                                    "_id": "f0ee8249946e6402"
                                  }
                                },
                                "_id": "f0ee8249946e6401",
                                "modelValue": "{{state.select.multiple}}",
                                "onUpdate:modelValue": "{{(v) => {\n  state.select.multiple = v\n}}}",
                                "density": "compact"
                              },
                              {
                                "is": "v-checkbox",
                                "hideDetails": "auto",
                                "valueComparator": "{{(a, b) => a == b}}",
                                "children": {
                                  "label": {
                                    "children": [
                                      {
                                        "is": "span",
                                        "children": "Chips",
                                        "_id": "56d79f16b07cc505"
                                      }
                                    ],
                                    "_id": "56d79f16b07cc506"
                                  }
                                },
                                "_id": "56d79f16b07cc507",
                                "modelValue": "{{state.select.chips}}",
                                "onUpdate:modelValue": "{{(v) => {\n  state.select.chips = v\n}}}",
                                "density": "compact"
                              }
                            ],
                            "_id": "56d79f16b07cc501",
                            "style": {
                              "display": "flex",
                              "flexWrap": "wrap",
                              "gap": "12px 12px"
                            }
                          },
                          {
                            "is": "div",
                            "children": [
                              {
                                "is": "v-select",
                                "label": "Label",
                                "clearable": true,
                                "items": [
                                  {
                                    "title": "Florida",
                                    "value": "FL"
                                  },
                                  {
                                    "title": "Georgia",
                                    "value": "GA"
                                  },
                                  {
                                    "title": "Nebraska",
                                    "value": "NE"
                                  },
                                  {
                                    "title": "California",
                                    "value": "CA"
                                  },
                                  {
                                    "title": "New York",
                                    "value": "NY"
                                  }
                                ],
                                "_id": "e71b07a832ef6701",
                                "disabled": "{{state.select.disabled}}",
                                "chips": "{{state.select.chips}}",
                                "multiple": "{{state.select.multiple}}",
                                "counter": 10,
                                "modelValue": "{{state.select.value}}",
                                "onUpdate:modelValue": "{{(v) => {\n  state.select.value = v\n}}}",
                                "valueComparator": "{{(a, b) => a == b}}",
                                "style": {
                                  "marginTop": "1px"
                                }
                              }
                            ],
                            "_id": "4a6ff6a96c0c3a1e",
                            "style": {
                              "display": "flex",
                              "gap": "12px 12px",
                              "flexWrap": "wrap"
                            }
                          }
                        ],
                        "_id": "4a6ff6a96c0c3a1f"
                      }
                    ],
                    "_id": "4a6ff6a96c0c3a20"
                  },
                  {
                    "is": "v-expansion-panel",
                    "children": [
                      {
                        "is": "v-expansion-panel-title",
                        "children": {
                          "default": {
                            "scope": "$panel",
                            "children": [
                              {
                                "is": "uno-icon",
                                "src": "https://api.iconify.design/mdi:radiobox-marked.svg",
                                "_id": "717d18cad19f1802",
                                "style": {
                                  "width": "24px",
                                  "height": "24px",
                                  "marginRight": "12px"
                                }
                              },
                              {
                                "is": "span",
                                "children": "Radio",
                                "_id": "717d18cad19f1803"
                              }
                            ],
                            "_id": "717d18cad19f1804"
                          }
                        },
                        "_id": "717d18cad19f1805"
                      },
                      {
                        "is": "v-expansion-panel-text",
                        "children": [
                          {
                            "is": "v-checkbox",
                            "hideDetails": "auto",
                            "valueComparator": "{{(a, b) => a == b}}",
                            "children": {
                              "label": {
                                "children": [
                                  {
                                    "is": "span",
                                    "children": "Inline",
                                    "_id": "f8d422aa0f05d303"
                                  }
                                ],
                                "_id": "f8d422aa0f05d302"
                              }
                            },
                            "_id": "f8d422aa0f05d301",
                            "density": "compact",
                            "modelValue": "{{state.radios.inline}}",
                            "onUpdate:modelValue": "{{(v) => {\n  state.radios.inline = v\n}}}"
                          },
                          {
                            "is": "div",
                            "children": [
                              {
                                "is": "v-radio-group",
                                "hideDetails": "auto",
                                "valueComparator": "{{(a, b) => a == b}}",
                                "children": {
                                  "label": {
                                    "children": [
                                      {
                                        "is": "span",
                                        "children": "Radio Group",
                                        "_id": "3e12cf52e0a2c904"
                                      }
                                    ],
                                    "_id": "3e12cf52e0a2c902"
                                  },
                                  "default": {
                                    "children": [
                                      {
                                        "is": "v-radio",
                                        "hideDetails": "auto",
                                        "valueComparator": "{{(a, b) => a == b}}",
                                        "children": {
                                          "label": {
                                            "children": [
                                              {
                                                "is": "span",
                                                "children": "Radio",
                                                "_id": "3e12cf52e0a2c90b"
                                              }
                                            ],
                                            "_id": "3e12cf52e0a2c908"
                                          }
                                        },
                                        "_id": "3e12cf52e0a2c905",
                                        "value": "1"
                                      },
                                      {
                                        "is": "v-radio",
                                        "hideDetails": "auto",
                                        "valueComparator": "{{(a, b) => a == b}}",
                                        "children": {
                                          "label": {
                                            "children": [
                                              {
                                                "is": "span",
                                                "children": "Primary",
                                                "_id": "3e12cf52e0a2c90c"
                                              }
                                            ],
                                            "_id": "3e12cf52e0a2c909"
                                          }
                                        },
                                        "_id": "3e12cf52e0a2c906",
                                        "value": "2",
                                        "color": "primary"
                                      },
                                      {
                                        "is": "v-radio",
                                        "hideDetails": "auto",
                                        "valueComparator": "{{(a, b) => a == b}}",
                                        "children": {
                                          "label": {
                                            "children": [
                                              {
                                                "is": "span",
                                                "children": "Success",
                                                "_id": "3e12cf52e0a2c90d"
                                              }
                                            ],
                                            "_id": "3e12cf52e0a2c90a"
                                          }
                                        },
                                        "_id": "3e12cf52e0a2c907",
                                        "value": "3",
                                        "color": "success"
                                      },
                                      {
                                        "is": "v-radio",
                                        "hideDetails": "auto",
                                        "valueComparator": "{{(a, b) => a == b}}",
                                        "children": {
                                          "label": {
                                            "children": [
                                              {
                                                "is": "span",
                                                "children": "Warning",
                                                "_id": "3e12cf52e0a2c911"
                                              }
                                            ],
                                            "_id": "3e12cf52e0a2c912"
                                          }
                                        },
                                        "_id": "3e12cf52e0a2c913",
                                        "value": "4",
                                        "color": "warning"
                                      },
                                      {
                                        "is": "v-radio",
                                        "hideDetails": "auto",
                                        "valueComparator": "{{(a, b) => a == b}}",
                                        "children": {
                                          "label": {
                                            "children": [
                                              {
                                                "is": "span",
                                                "children": "Error",
                                                "_id": "3e12cf52e0a2c90e"
                                              }
                                            ],
                                            "_id": "3e12cf52e0a2c90f"
                                          }
                                        },
                                        "_id": "3e12cf52e0a2c910",
                                        "value": "3",
                                        "color": "error"
                                      }
                                    ],
                                    "_id": "3e12cf52e0a2c903"
                                  }
                                },
                                "_id": "3e12cf52e0a2c901",
                                "inline": "{{state.radios.inline}}",
                                "modelValue": "{{state.radios.value}}",
                                "onUpdate:modelValue": "{{(v) => {\n  state.radios.value = v\n}}}"
                              }
                            ],
                            "_id": "717d18cad19f1806",
                            "style": {
                              "display": "flex",
                              "gap": "12px 12px",
                              "flexWrap": "wrap"
                            }
                          }
                        ],
                        "_id": "717d18cad19f1807"
                      }
                    ],
                    "_id": "717d18cad19f1808"
                  },
                  {
                    "is": "v-expansion-panel",
                    "children": [
                      {
                        "is": "v-expansion-panel-title",
                        "children": {
                          "default": {
                            "scope": "$panel",
                            "children": [
                              {
                                "is": "uno-icon",
                                "src": "https://api.iconify.design/mdi:checkbox-marked-outline.svg",
                                "_id": "e08482e3b0e2cb02",
                                "style": {
                                  "width": "24px",
                                  "height": "24px",
                                  "marginRight": "12px"
                                }
                              },
                              {
                                "is": "span",
                                "children": "Checkbox",
                                "_id": "e08482e3b0e2cb03"
                              }
                            ],
                            "_id": "e08482e3b0e2cb04"
                          }
                        },
                        "_id": "e08482e3b0e2cb05"
                      },
                      {
                        "is": "v-expansion-panel-text",
                        "children": [
                          {
                            "is": "v-checkbox",
                            "hideDetails": "auto",
                            "valueComparator": "{{(a, b) => a == b}}",
                            "children": {
                              "label": {
                                "children": [
                                  {
                                    "is": "span",
                                    "children": "{{state.checkbox.value2}}",
                                    "_id": "fea17234a70a8a0e"
                                  }
                                ],
                                "_id": "fea17234a70a8a0f"
                              }
                            },
                            "_id": "fea17234a70a8a10",
                            "modelValue": "{{state.checkbox.value2}}",
                            "onUpdate:modelValue": "{{(v) => {\n  state.checkbox.value2 = v\n}}}"
                          },
                          {
                            "is": "p",
                            "children": "{{JSON.stringify(state.checkbox.value)}}",
                            "_id": "fea17234a70a8a07"
                          },
                          {
                            "is": "div",
                            "children": [
                              {
                                "is": "v-checkbox",
                                "hideDetails": "auto",
                                "valueComparator": "{{(a, b) => a == b}}",
                                "children": {
                                  "label": {
                                    "children": [
                                      {
                                        "is": "span",
                                        "children": "Primary",
                                        "_id": "fea17234a70a8a03"
                                      }
                                    ],
                                    "_id": "fea17234a70a8a02"
                                  }
                                },
                                "_id": "fea17234a70a8a01",
                                "modelValue": "{{state.checkbox.value}}",
                                "onUpdate:modelValue": "{{(v) => {\n  state.checkbox.value = v\n}}}",
                                "value": "primary",
                                "color": "primary"
                              },
                              {
                                "is": "v-checkbox",
                                "hideDetails": "auto",
                                "valueComparator": "{{(a, b) => a == b}}",
                                "children": {
                                  "label": {
                                    "children": [
                                      {
                                        "is": "span",
                                        "children": "Success",
                                        "_id": "fea17234a70a8a06"
                                      }
                                    ],
                                    "_id": "fea17234a70a8a05"
                                  }
                                },
                                "_id": "fea17234a70a8a04",
                                "modelValue": "{{state.checkbox.value}}",
                                "onUpdate:modelValue": "{{(v) => {\n  state.checkbox.value = v\n}}}",
                                "color": "success",
                                "value": "success"
                              },
                              {
                                "is": "v-checkbox",
                                "hideDetails": "auto",
                                "valueComparator": "{{(a, b) => a == b}}",
                                "children": {
                                  "label": {
                                    "children": [
                                      {
                                        "is": "span",
                                        "children": "Warning",
                                        "_id": "fea17234a70a8a11"
                                      }
                                    ],
                                    "_id": "fea17234a70a8a12"
                                  }
                                },
                                "_id": "fea17234a70a8a13",
                                "modelValue": "{{state.checkbox.value}}",
                                "onUpdate:modelValue": "{{(v) => {\n  state.checkbox.value = v\n}}}",
                                "color": "warning",
                                "value": "warning"
                              },
                              {
                                "is": "v-checkbox",
                                "hideDetails": "auto",
                                "valueComparator": "{{(a, b) => a == b}}",
                                "multiple": true,
                                "children": {
                                  "label": {
                                    "children": [
                                      {
                                        "is": "span",
                                        "children": "Error",
                                        "_id": "fea17234a70a8a14"
                                      }
                                    ],
                                    "_id": "fea17234a70a8a15"
                                  }
                                },
                                "_id": "fea17234a70a8a16",
                                "modelValue": "{{state.checkbox.value}}",
                                "onUpdate:modelValue": "{{(v) => {\n  state.checkbox.value = v\n}}}",
                                "color": "error",
                                "value": "error"
                              }
                            ],
                            "_id": "e08482e3b0e2cb06",
                            "style": {
                              "display": "flex",
                              "gap": "12px 12px",
                              "flexWrap": "wrap"
                            }
                          }
                        ],
                        "_id": "e08482e3b0e2cb07"
                      }
                    ],
                    "_id": "e08482e3b0e2cb08"
                  },
                  {
                    "is": "v-expansion-panel",
                    "children": [
                      {
                        "is": "v-expansion-panel-title",
                        "children": {
                          "default": {
                            "scope": "$panel",
                            "children": [
                              {
                                "is": "uno-icon",
                                "src": "https://api.iconify.design/mdi:toggle-switch-outline.svg",
                                "_id": "f98440f5c2c9ed01",
                                "style": {
                                  "width": "24px",
                                  "height": "24px",
                                  "marginRight": "12px"
                                }
                              },
                              {
                                "is": "span",
                                "children": "Switch",
                                "_id": "f98440f5c2c9ed02"
                              }
                            ],
                            "_id": "f98440f5c2c9ed03"
                          }
                        },
                        "_id": "f98440f5c2c9ed04"
                      },
                      {
                        "is": "v-expansion-panel-text",
                        "children": [
                          {
                            "is": "v-switch",
                            "hideDetails": "auto",
                            "valueComparator": "{{(a, b) => a == b}}",
                            "children": {
                              "label": {
                                "children": [
                                  {
                                    "is": "span",
                                    "children": "{{'Switch: ' + state.switch.value}}",
                                    "_id": "4b34ea0456061103"
                                  }
                                ],
                                "_id": "4b34ea0456061102"
                              }
                            },
                            "_id": "4b34ea0456061101",
                            "color": "primary",
                            "modelValue": "{{state.switch.value}}",
                            "onUpdate:modelValue": "{{(v) => {\n  state.switch.value = v\n}}}",
                            "inline": true
                          },
                          {
                            "is": "div",
                            "children": [
                              {
                                "is": "v-switch",
                                "hideDetails": "auto",
                                "valueComparator": "{{(a, b) => a == b}}",
                                "children": {
                                  "label": {
                                    "children": [
                                      {
                                        "is": "span",
                                        "children": "Primary",
                                        "_id": "044661729ba98801"
                                      }
                                    ],
                                    "_id": "044661729ba98802"
                                  }
                                },
                                "_id": "044661729ba98803",
                                "color": "primary",
                                "modelValue": "{{state.switch.value}}",
                                "onUpdate:modelValue": "{{(v) => {\n  state.switch.value = v\n}}}"
                              },
                              {
                                "is": "v-switch",
                                "hideDetails": "auto",
                                "valueComparator": "{{(a, b) => a == b}}",
                                "children": {
                                  "label": {
                                    "children": [
                                      {
                                        "is": "span",
                                        "children": "Success",
                                        "_id": "044661729ba9880a"
                                      }
                                    ],
                                    "_id": "044661729ba9880b"
                                  }
                                },
                                "_id": "044661729ba9880c",
                                "color": "success",
                                "modelValue": "{{state.switch.value}}",
                                "onUpdate:modelValue": "{{(v) => {\n  state.switch.value = v\n}}}"
                              },
                              {
                                "is": "v-switch",
                                "hideDetails": "auto",
                                "valueComparator": "{{(a, b) => a == b}}",
                                "children": {
                                  "label": {
                                    "children": [
                                      {
                                        "is": "span",
                                        "children": "Warning",
                                        "_id": "044661729ba98807"
                                      }
                                    ],
                                    "_id": "044661729ba98808"
                                  }
                                },
                                "_id": "044661729ba98809",
                                "color": "warning",
                                "modelValue": "{{state.switch.value}}",
                                "onUpdate:modelValue": "{{(v) => {\n  state.switch.value = v\n}}}"
                              },
                              {
                                "is": "v-switch",
                                "hideDetails": "auto",
                                "valueComparator": "{{(a, b) => a == b}}",
                                "children": {
                                  "label": {
                                    "children": [
                                      {
                                        "is": "span",
                                        "children": "Error",
                                        "_id": "044661729ba98804"
                                      }
                                    ],
                                    "_id": "044661729ba98805"
                                  }
                                },
                                "_id": "044661729ba98806",
                                "color": "error",
                                "modelValue": "{{state.switch.value}}",
                                "onUpdate:modelValue": "{{(v) => {\n  state.switch.value = v\n}}}"
                              }
                            ],
                            "_id": "f98440f5c2c9ed15",
                            "style": {
                              "display": "flex",
                              "gap": "12px 12px",
                              "flexWrap": "wrap"
                            }
                          },
                          {
                            "is": "div",
                            "children": [
                              {
                                "is": "v-switch",
                                "hideDetails": "auto",
                                "valueComparator": "{{(a, b) => a == b}}",
                                "children": {
                                  "label": {
                                    "children": [
                                      {
                                        "is": "span",
                                        "children": "Primary",
                                        "_id": "044661729ba9880d"
                                      }
                                    ],
                                    "_id": "044661729ba9880e"
                                  }
                                },
                                "_id": "044661729ba9880f",
                                "color": "primary",
                                "modelValue": "{{state.switch.value}}",
                                "onUpdate:modelValue": "{{(v) => {\n  state.switch.value = v\n}}}",
                                "inset": true
                              },
                              {
                                "is": "v-switch",
                                "hideDetails": "auto",
                                "valueComparator": "{{(a, b) => a == b}}",
                                "children": {
                                  "label": {
                                    "children": [
                                      {
                                        "is": "span",
                                        "children": "Success",
                                        "_id": "044661729ba98810"
                                      }
                                    ],
                                    "_id": "044661729ba98811"
                                  }
                                },
                                "_id": "044661729ba98812",
                                "color": "success",
                                "modelValue": "{{state.switch.value}}",
                                "onUpdate:modelValue": "{{(v) => {\n  state.switch.value = v\n}}}",
                                "inset": true
                              },
                              {
                                "is": "v-switch",
                                "hideDetails": "auto",
                                "valueComparator": "{{(a, b) => a == b}}",
                                "children": {
                                  "label": {
                                    "children": [
                                      {
                                        "is": "span",
                                        "children": "Warning",
                                        "_id": "044661729ba98813"
                                      }
                                    ],
                                    "_id": "044661729ba98814"
                                  }
                                },
                                "_id": "044661729ba98815",
                                "color": "warning",
                                "modelValue": "{{state.switch.value}}",
                                "onUpdate:modelValue": "{{(v) => {\n  state.switch.value = v\n}}}",
                                "inset": true
                              },
                              {
                                "is": "v-switch",
                                "hideDetails": "auto",
                                "valueComparator": "{{(a, b) => a == b}}",
                                "children": {
                                  "label": {
                                    "children": [
                                      {
                                        "is": "span",
                                        "children": "Error",
                                        "_id": "044661729ba98816"
                                      }
                                    ],
                                    "_id": "044661729ba98817"
                                  }
                                },
                                "_id": "044661729ba98818",
                                "color": "error",
                                "modelValue": "{{state.switch.value}}",
                                "onUpdate:modelValue": "{{(v) => {\n  state.switch.value = v\n}}}",
                                "inset": true
                              }
                            ],
                            "_id": "044661729ba98819",
                            "style": {
                              "display": "flex",
                              "gap": "12px 12px",
                              "flexWrap": "wrap"
                            }
                          }
                        ],
                        "_id": "f98440f5c2c9ed16"
                      }
                    ],
                    "_id": "f98440f5c2c9ed17"
                  },
                  {
                    "is": "v-expansion-panel",
                    "children": [
                      {
                        "is": "v-expansion-panel-title",
                        "children": {
                          "default": {
                            "scope": "$panel",
                            "children": [
                              {
                                "is": "uno-icon",
                                "src": "https://api.iconify.design/radix-icons:slider.svg",
                                "_id": "704cac32f1515a05",
                                "style": {
                                  "width": "24px",
                                  "height": "24px",
                                  "marginRight": "12px"
                                }
                              },
                              {
                                "is": "span",
                                "children": "Slider",
                                "_id": "704cac32f1515a06"
                              }
                            ],
                            "_id": "704cac32f1515a07"
                          }
                        },
                        "_id": "704cac32f1515a08"
                      },
                      {
                        "is": "v-expansion-panel-text",
                        "children": [
                          {
                            "is": "div",
                            "children": [
                              {
                                "is": "v-slider",
                                "thumbLabel": true,
                                "hideDetails": "auto",
                                "valueComparator": "{{(a, b) => a == b}}",
                                "children": {
                                  "label": {
                                    "children": [
                                      {
                                        "is": "span",
                                        "children": "Slider",
                                        "_id": "704cac32f1515a04"
                                      }
                                    ],
                                    "_id": "704cac32f1515a03"
                                  }
                                },
                                "_id": "704cac32f1515a02",
                                "step": 1
                              },
                              {
                                "is": "v-range-slider",
                                "thumbLabel": true,
                                "hideDetails": "auto",
                                "valueComparator": "{{(a, b) => a == b}}",
                                "children": {
                                  "label": {
                                    "children": [
                                      {
                                        "is": "span",
                                        "children": "Slider",
                                        "_id": "f19cdcf48bfff501"
                                      }
                                    ],
                                    "_id": "f19cdcf48bfff502"
                                  }
                                },
                                "_id": "f19cdcf48bfff503",
                                "modelValue": "{{state.slider.values}}",
                                "onUpdate:modelValue": "{{(v) => {\n  state.slider.values = v\n}}}",
                                "step": 10,
                                "showTicks": "always",
                                "color": "success"
                              },
                              {
                                "is": "v-slider",
                                "thumbLabel": true,
                                "hideDetails": "auto",
                                "valueComparator": "{{(a, b) => a == b}}",
                                "children": {
                                  "label": {
                                    "children": [
                                      {
                                        "is": "span",
                                        "children": "Slider",
                                        "_id": "704cac32f1515a28"
                                      }
                                    ],
                                    "_id": "704cac32f1515a29"
                                  }
                                },
                                "_id": "704cac32f1515a2a",
                                "step": 10,
                                "max": 30,
                                "tickSize": 4,
                                "ticks": "{{{\r\n  0: 'Figs',\r\n  10: 'Lemon',\r\n  20: 'Pear',\r\n  30: 'Apple',\r\n}}}",
                                "showTicks": "always",
                                "color": "primary"
                              }
                            ],
                            "_id": "704cac32f1515a25",
                            "style": {
                              "display": "flex",
                              "gap": "12px 12px",
                              "flexDirection": "column"
                            }
                          }
                        ],
                        "_id": "704cac32f1515a26"
                      }
                    ],
                    "_id": "704cac32f1515a27"
                  },
                  {
                    "is": "v-expansion-panel",
                    "children": [
                      {
                        "is": "v-expansion-panel-title",
                        "children": {
                          "default": {
                            "scope": "$panel",
                            "children": [
                              {
                                "is": "uno-icon",
                                "src": "https://api.iconify.design/streamline:interface-favorite-star-reward-rating-rate-social-star-media-favorite-like-stars.svg",
                                "_id": "b6d2da7d9d433401",
                                "style": {
                                  "width": "24px",
                                  "height": "24px",
                                  "marginRight": "12px"
                                }
                              },
                              {
                                "is": "span",
                                "children": "Rate",
                                "_id": "b6d2da7d9d433402"
                              }
                            ],
                            "_id": "b6d2da7d9d433403"
                          }
                        },
                        "_id": "b6d2da7d9d433404"
                      },
                      {
                        "is": "v-expansion-panel-text",
                        "children": [
                          {
                            "is": "div",
                            "children": [],
                            "_id": "b6d2da7d9d43340e",
                            "style": {
                              "display": "flex",
                              "gap": "12px 12px",
                              "flexDirection": "column"
                            }
                          }
                        ],
                        "_id": "b6d2da7d9d43340f"
                      }
                    ],
                    "_id": "b6d2da7d9d433410"
                  },
                  {
                    "is": "v-expansion-panel",
                    "children": [
                      {
                        "is": "v-expansion-panel-title",
                        "children": {
                          "default": {
                            "scope": "$panel",
                            "children": [
                              {
                                "is": "uno-icon",
                                "src": "https://api.iconify.design/mdi:integrated-circuit-chip.svg",
                                "_id": "53d98fd689073102",
                                "style": {
                                  "width": "24px",
                                  "height": "24px",
                                  "marginRight": "12px"
                                }
                              },
                              {
                                "is": "span",
                                "children": "Chip Group",
                                "_id": "53d98fd689073103"
                              }
                            ],
                            "_id": "53d98fd689073104"
                          }
                        },
                        "_id": "53d98fd689073105"
                      },
                      {
                        "is": "v-expansion-panel-text",
                        "children": [
                          {
                            "is": "div",
                            "children": [
                              {
                                "is": "v-chip-group",
                                "color": "success",
                                "valueComparator": "{{(a, b) => a == b}}",
                                "children": [
                                  {
                                    "is": "v-chip",
                                    "children": [
                                      {
                                        "is": "span",
                                        "children": "Chip",
                                        "_id": "534d5b7da4c23214"
                                      }
                                    ],
                                    "value": "1",
                                    "_id": "534d5b7da4c23211"
                                  },
                                  {
                                    "is": "v-chip",
                                    "children": [
                                      {
                                        "is": "span",
                                        "children": "Chip",
                                        "_id": "534d5b7da4c23215"
                                      }
                                    ],
                                    "value": "2",
                                    "_id": "534d5b7da4c23212"
                                  },
                                  {
                                    "is": "v-chip",
                                    "children": [
                                      {
                                        "is": "span",
                                        "children": "Chip",
                                        "_id": "534d5b7da4c23216"
                                      }
                                    ],
                                    "value": "3",
                                    "_id": "534d5b7da4c23213"
                                  }
                                ],
                                "_id": "534d5b7da4c23210",
                                "modelValue": "{{state.chips.value}}",
                                "onUpdate:modelValue": "{{(v) => {\n  state.chips.value = v\n}}}"
                              },
                              {
                                "is": "p",
                                "children": "Multiple",
                                "_id": "0c6716e67b6f2f02"
                              },
                              {
                                "is": "v-chip-group",
                                "color": "primary",
                                "valueComparator": "{{(a, b) => a == b}}",
                                "children": [
                                  {
                                    "is": "v-chip",
                                    "children": [
                                      {
                                        "is": "span",
                                        "children": "Work",
                                        "_id": "0c6716e67b6f2f07"
                                      }
                                    ],
                                    "value": "Work",
                                    "_id": "0c6716e67b6f2f04"
                                  },
                                  {
                                    "is": "v-chip",
                                    "children": [
                                      {
                                        "is": "span",
                                        "children": "Home Improvement",
                                        "_id": "0c6716e67b6f2f08"
                                      }
                                    ],
                                    "value": "Home Improvement",
                                    "_id": "0c6716e67b6f2f05"
                                  },
                                  {
                                    "is": "v-chip",
                                    "children": [
                                      {
                                        "is": "span",
                                        "children": "Vacation",
                                        "_id": "0c6716e67b6f2f09"
                                      }
                                    ],
                                    "value": "Vacation",
                                    "_id": "0c6716e67b6f2f06"
                                  },
                                  {
                                    "is": "v-chip",
                                    "children": [
                                      {
                                        "is": "span",
                                        "children": "Food",
                                        "_id": "0c6716e67b6f2f0c"
                                      }
                                    ],
                                    "value": "Food",
                                    "_id": "0c6716e67b6f2f0d"
                                  },
                                  {
                                    "is": "v-chip",
                                    "children": [
                                      {
                                        "is": "span",
                                        "children": "Drawers",
                                        "_id": "0c6716e67b6f2f0a"
                                      }
                                    ],
                                    "value": "Drawers",
                                    "_id": "0c6716e67b6f2f0b"
                                  },
                                  {
                                    "is": "v-chip",
                                    "children": [
                                      {
                                        "is": "span",
                                        "children": "Shopping",
                                        "_id": "0c6716e67b6f2f10"
                                      }
                                    ],
                                    "value": "Shopping",
                                    "_id": "0c6716e67b6f2f11"
                                  },
                                  {
                                    "is": "v-chip",
                                    "children": [
                                      {
                                        "is": "span",
                                        "children": "Art",
                                        "_id": "0c6716e67b6f2f0e"
                                      }
                                    ],
                                    "value": "Art",
                                    "_id": "0c6716e67b6f2f0f"
                                  }
                                ],
                                "_id": "0c6716e67b6f2f03",
                                "modelValue": "{{state.chips.values}}",
                                "onUpdate:modelValue": "{{(v) => {\n  state.chips.values = v\n}}}",
                                "multiple": true,
                                "column": true
                              }
                            ],
                            "_id": "53d98fd689073107",
                            "style": {
                              "display": "flex",
                              "gap": "12px 12px",
                              "flexDirection": "column"
                            }
                          }
                        ],
                        "_id": "53d98fd689073108"
                      }
                    ],
                    "_id": "53d98fd689073109"
                  },
                  {
                    "is": "v-expansion-panel",
                    "children": [
                      {
                        "is": "v-expansion-panel-title",
                        "children": {
                          "default": {
                            "scope": "$panel",
                            "children": [
                              {
                                "is": "uno-icon",
                                "src": "https://api.iconify.design/iconoir:window-tabs.svg",
                                "_id": "534d5b7da4c23208",
                                "style": {
                                  "width": "24px",
                                  "height": "24px",
                                  "marginRight": "12px"
                                }
                              },
                              {
                                "is": "span",
                                "children": "Tabs\n\n",
                                "_id": "534d5b7da4c23209"
                              }
                            ],
                            "_id": "534d5b7da4c2320a"
                          }
                        },
                        "_id": "534d5b7da4c2320b"
                      },
                      {
                        "is": "v-expansion-panel-text",
                        "children": [
                          {
                            "is": "div",
                            "children": [
                              {
                                "is": "v-tabs",
                                "children": [
                                  {
                                    "is": "v-tab",
                                    "children": [
                                      {
                                        "is": "span",
                                        "children": "Tab 1",
                                        "_id": "1a68970c9bf2bd0c"
                                      }
                                    ],
                                    "_id": "1a68970c9bf2bd09"
                                  },
                                  {
                                    "is": "v-tab",
                                    "children": [
                                      {
                                        "is": "span",
                                        "children": "Tab 2",
                                        "_id": "1a68970c9bf2bd0d"
                                      }
                                    ],
                                    "_id": "1a68970c9bf2bd0a"
                                  }
                                ],
                                "_id": "1a68970c9bf2bd08",
                                "alignTabs": "start",
                                "modelValue": "{{state.tabs.value}}",
                                "onUpdate:modelValue": "{{(v) => {\n  state.tabs.value = v\n}}}"
                              },
                              {
                                "is": "v-tabs",
                                "children": [
                                  {
                                    "is": "v-tab",
                                    "children": [
                                      {
                                        "is": "span",
                                        "children": "Tab 1",
                                        "_id": "1a68970c9bf2bd30"
                                      }
                                    ],
                                    "_id": "1a68970c9bf2bd31"
                                  },
                                  {
                                    "is": "v-tab",
                                    "children": [
                                      {
                                        "is": "span",
                                        "children": "Tab 2",
                                        "_id": "1a68970c9bf2bd32"
                                      }
                                    ],
                                    "_id": "1a68970c9bf2bd33"
                                  }
                                ],
                                "_id": "1a68970c9bf2bd36",
                                "alignTabs": "start",
                                "color": "primary",
                                "modelValue": "{{state.tabs.value}}",
                                "onUpdate:modelValue": "{{(v) => {\n  state.tabs.value = v\n}}}"
                              },
                              {
                                "is": "v-tabs",
                                "children": [
                                  {
                                    "is": "v-tab",
                                    "children": [
                                      {
                                        "is": "span",
                                        "children": "Tab 1",
                                        "_id": "1a68970c9bf2bd29"
                                      }
                                    ],
                                    "_id": "1a68970c9bf2bd2a"
                                  },
                                  {
                                    "is": "v-tab",
                                    "children": [
                                      {
                                        "is": "span",
                                        "children": "Tab 2",
                                        "_id": "1a68970c9bf2bd2b"
                                      }
                                    ],
                                    "_id": "1a68970c9bf2bd2c"
                                  }
                                ],
                                "_id": "1a68970c9bf2bd2f",
                                "alignTabs": "start",
                                "color": "success",
                                "grow": true,
                                "modelValue": "{{state.tabs.value}}",
                                "onUpdate:modelValue": "{{(v) => {\n  state.tabs.value = v\n}}}"
                              }
                            ],
                            "_id": "534d5b7da4c2320d",
                            "style": {
                              "display": "flex",
                              "gap": "12px 12px",
                              "flexDirection": "column"
                            }
                          },
                          {
                            "is": "v-tabs-window",
                            "children": [
                              {
                                "is": "v-tabs-window-item",
                                "children": [
                                  {
                                    "is": "h3",
                                    "children": "Tab 1 Content",
                                    "_id": "78a50294b63fcd05"
                                  }
                                ],
                                "_id": "78a50294b63fcd02"
                              },
                              {
                                "is": "v-tabs-window-item",
                                "children": [
                                  {
                                    "is": "h3",
                                    "children": "Tab 2 Content",
                                    "_id": "78a50294b63fcd06"
                                  }
                                ],
                                "_id": "78a50294b63fcd03"
                              }
                            ],
                            "_id": "78a50294b63fcd01",
                            "modelValue": "{{state.tabs.value}}",
                            "onUpdate:modelValue": "{{(v) => {\n  state.tabs.value = v\n}}}",
                            "style": {
                              "paddingTop": "16px",
                              "paddingBottom": "16px",
                              "paddingLeft": "16px",
                              "paddingRight": "16px",
                              "backgroundColor": "rgba(71, 71, 71, 1)"
                            }
                          }
                        ],
                        "_id": "534d5b7da4c2320e"
                      }
                    ],
                    "_id": "534d5b7da4c2320f"
                  },
                  {
                    "is": "v-expansion-panel",
                    "children": [
                      {
                        "is": "v-expansion-panel-title",
                        "children": {
                          "default": {
                            "scope": "$panel",
                            "children": [
                              {
                                "is": "uno-icon",
                                "src": "https://api.iconify.design/mdi:calendar.svg",
                                "_id": "1a68970c9bf2bd01",
                                "style": {
                                  "width": "24px",
                                  "height": "24px",
                                  "marginRight": "12px"
                                }
                              },
                              {
                                "is": "span",
                                "children": "Date Input",
                                "_id": "1a68970c9bf2bd02"
                              }
                            ],
                            "_id": "1a68970c9bf2bd03"
                          }
                        },
                        "_id": "1a68970c9bf2bd04"
                      },
                      {
                        "is": "v-expansion-panel-text",
                        "children": [
                          {
                            "is": "div",
                            "children": [],
                            "_id": "1a68970c9bf2bd05",
                            "style": {
                              "display": "flex",
                              "gap": "12px 12px",
                              "flexDirection": "column"
                            }
                          }
                        ],
                        "_id": "1a68970c9bf2bd06"
                      }
                    ],
                    "_id": "1a68970c9bf2bd07"
                  }
                ],
                "_id": "c8ab828199239d03"
              },
              {
                "is": "div",
                "children": [
                  {
                    "is": "v-navigation-drawer",
                    "children": {
                      "default": {
                        "children": [
                          {
                            "is": "v-list",
                            "valueComparator": "{{(a, b) => a == b}}",
                            "children": [
                              {
                                "is": "v-list-item",
                                "children": {
                                  "default": {
                                    "children": [
                                      {
                                        "is": "span",
                                        "children": "My Files",
                                        "_id": "9612b2791da9c01b"
                                      }
                                    ],
                                    "_id": "9612b2791da9c015"
                                  },
                                  "prepend": {
                                    "children": [
                                      {
                                        "is": "v-icon",
                                        "icon": "mdi-folder",
                                        "_id": "9612b2791da9c01c"
                                      }
                                    ],
                                    "_id": "9612b2791da9c016"
                                  }
                                },
                                "_id": "9612b2791da9c012",
                                "value": "1"
                              },
                              {
                                "is": "v-list-item",
                                "children": {
                                  "default": {
                                    "children": [
                                      {
                                        "is": "span",
                                        "children": "Shared with me",
                                        "_id": "9612b2791da9c01d"
                                      }
                                    ],
                                    "_id": "9612b2791da9c017"
                                  },
                                  "prepend": {
                                    "children": [
                                      {
                                        "is": "v-icon",
                                        "icon": "mdi-account-multiple",
                                        "_id": "9612b2791da9c01e"
                                      }
                                    ],
                                    "_id": "9612b2791da9c018"
                                  }
                                },
                                "_id": "9612b2791da9c013",
                                "value": "2"
                              },
                              {
                                "is": "v-list-item",
                                "children": {
                                  "default": {
                                    "children": [
                                      {
                                        "is": "span",
                                        "children": "Starred",
                                        "_id": "9612b2791da9c01f"
                                      }
                                    ],
                                    "_id": "9612b2791da9c019"
                                  },
                                  "prepend": {
                                    "children": [
                                      {
                                        "is": "v-icon",
                                        "icon": "mdi-star",
                                        "_id": "9612b2791da9c020"
                                      }
                                    ],
                                    "_id": "9612b2791da9c01a"
                                  }
                                },
                                "_id": "9612b2791da9c014",
                                "value": "3"
                              },
                              {
                                "is": "v-list-item",
                                "children": {
                                  "default": {
                                    "children": [
                                      {
                                        "is": "span",
                                        "children": "Recent",
                                        "_id": "8c52e9931c3a6811"
                                      }
                                    ],
                                    "_id": "8c52e9931c3a6812"
                                  },
                                  "prepend": {
                                    "children": [
                                      {
                                        "is": "v-icon",
                                        "icon": "mdi-history",
                                        "_id": "8c52e9931c3a6813"
                                      }
                                    ],
                                    "_id": "8c52e9931c3a6814"
                                  }
                                },
                                "_id": "8c52e9931c3a6815",
                                "value": "4"
                              },
                              {
                                "is": "v-list-item",
                                "children": {
                                  "default": {
                                    "children": [
                                      {
                                        "is": "span",
                                        "children": "Offline",
                                        "_id": "8c52e9931c3a680c"
                                      }
                                    ],
                                    "_id": "8c52e9931c3a680d"
                                  },
                                  "prepend": {
                                    "children": [
                                      {
                                        "is": "v-icon",
                                        "icon": "mdi-check-circle",
                                        "_id": "8c52e9931c3a680e"
                                      }
                                    ],
                                    "_id": "8c52e9931c3a680f"
                                  }
                                },
                                "_id": "8c52e9931c3a6810",
                                "value": "5"
                              },
                              {
                                "is": "v-list-item",
                                "children": {
                                  "default": {
                                    "children": [
                                      {
                                        "is": "span",
                                        "children": "Uploads",
                                        "_id": "8c52e9931c3a6807"
                                      }
                                    ],
                                    "_id": "8c52e9931c3a6808"
                                  },
                                  "prepend": {
                                    "children": [
                                      {
                                        "is": "v-icon",
                                        "icon": "mdi-upload",
                                        "_id": "8c52e9931c3a6809"
                                      }
                                    ],
                                    "_id": "8c52e9931c3a680a"
                                  }
                                },
                                "_id": "8c52e9931c3a680b",
                                "value": "6"
                              },
                              {
                                "is": "v-list-item",
                                "children": {
                                  "default": {
                                    "children": [
                                      {
                                        "is": "span",
                                        "children": "Backups",
                                        "_id": "8c52e9931c3a6802"
                                      }
                                    ],
                                    "_id": "8c52e9931c3a6803"
                                  },
                                  "prepend": {
                                    "children": [
                                      {
                                        "is": "v-icon",
                                        "icon": "mdi-cloud-upload",
                                        "_id": "8c52e9931c3a6804"
                                      }
                                    ],
                                    "_id": "8c52e9931c3a6805"
                                  }
                                },
                                "_id": "8c52e9931c3a6806",
                                "value": "7"
                              }
                            ],
                            "_id": "9612b2791da9c011",
                            "color": "success",
                            "selected": "{{state.list.value}}",
                            "onUpdate:selected": "{{(v) => {\n  state.list.value = v\n}}}"
                          }
                        ],
                        "_id": "9167d2eab64c9302"
                      },
                      "append": {
                        "children": [
                          {
                            "is": "div",
                            "children": [
                              {
                                "is": "v-btn",
                                "block": true,
                                "children": [
                                  {
                                    "is": "span",
                                    "children": "Logout",
                                    "_id": "9167d2eab64c9306"
                                  }
                                ],
                                "_id": "9167d2eab64c9305",
                                "style": {},
                                "variant": "tonal",
                                "color": "primary"
                              }
                            ],
                            "_id": "9167d2eab64c9309",
                            "style": {
                              "marginLeft": "8px",
                              "marginRight": "8px",
                              "marginBottom": "8px"
                            }
                          }
                        ],
                        "_id": "9167d2eab64c9303"
                      }
                    },
                    "_id": "9167d2eab64c9301",
                    "modelValue": "{{state.drawer.value}}",
                    "onUpdate:modelValue": "{{(v) => {\n  state.drawer.value = v\n}}}"
                  }
                ],
                "_id": "fd4d588fddc3c802",
                "style": {
                  "height": "337px"
                }
              }
            ],
            "_id": "95f33fdce2f75703"
          }
        ],
        "_id": "95f33fdce2f75701"
      }
    ],
    "plugins": [
      "/plugins/web",
      "/plugins/vuetify"
    ],
    "designer": {
      "canvas": {
        "style": {
          "width": "375px",
          "height": "667px"
        }
      }
    }
  }
}

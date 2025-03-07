export class TabGroups {
    all: TabGroup[] = []
    activeTabGroup: TabGroup
  }
  
  export class TabGroup {
    isActive = false
    tabs: Tab[] = []
    activeTab: Tab
    viewColumn: number
  }
  
  export class Tab {
    label: string
    isActive = false
    isDirty = false
    input: any
    group: TabGroup
  }
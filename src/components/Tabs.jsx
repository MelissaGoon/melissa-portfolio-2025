
import { useState } from 'react';

// Tabs data should be in the format:
//  tabData = [
//     { id: 'tab1', label: 'Tab 1', content: <div>Content 1</div> },
//     { id: 'tab2', label: 'Tab 2', content: <div>Content 2</div> },
//     { id: 'tab3', label: 'Tab 3', content: <div>Content 3</div> }
// ]
const Tabs = ({ tabs, styles }) => {
    const [activeTab, setActiveTab] = useState(tabs[0].id);

    return (
        <div>
            <div role="tablist" id="tablist" className={styles.tablist}>
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        role="tab"
                        aria-selected={activeTab === tab.id}
                        aria-controls={tab.id}
                        className={activeTab === tab.id ? styles.current : ''}
                        onClick={() => setActiveTab(tab.id)}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            <div id="content" className={styles.tabs_content}>
                {tabs.map((tab) => (
                    <div
                        key={tab.id}
                        id={tab.id}
                        role="tabpanel"
                        className={activeTab === tab.id ? styles.active : ''}
                        hidden={activeTab !== tab.id}
                    >
                        {tab.content}
                    </div>
                ))}
            </div>
        </div>
    );
}


export default Tabs


const InsightsContent = ({ acfInsightItem, className }) => {
    return (
        <div className={className}>
            <section>
                <h3>What Went Well</h3>
                <ul>
                    {acfInsightItem.what_went_well.map((item, index) => (<li key={index}>{item.bullet_item}</li>))}
                </ul>
            </section>
            <section>
                <h3>Future Improvements</h3>
                <ul>
                    {acfInsightItem.future_improvements.map((item, index) => (<li key={index}>{item.bullet_item}</li>))}
                </ul>
            </section>
        </div>
    )
}

export default InsightsContent
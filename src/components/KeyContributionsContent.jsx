
const KeyContributionsContent = ({ acfContributionItem, className }) => {
    return (
        <div className={className}>
            {acfContributionItem.contributions.length > 0 &&
                acfContributionItem.contributions.map((item, index) => (
                    <section key={index}>
                        <h3>{item.title}</h3>
                        <p>{item.description}</p>
                    </section>
                ))}
        </div>
    )
}

export default KeyContributionsContent
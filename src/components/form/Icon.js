function Icon({showMessage, showTooltip}) {
    return (
        <>
            <i
                data-tip={showMessage}
                className="bi bi-info-circle"
                onMouseEnter={() => showTooltip(true)}
                onMouseLeave={() => {
                    showTooltip(false);
                    setTimeout(() => showTooltip(true), 50);
                }}>
            </i>
        </>
    );
}

export default Icon;

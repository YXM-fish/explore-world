function formatProductGrade(val) {
    return {
        'HIGH': '高',
        'MIDDLE': '中',
        'LOW': '低'
    }[val]
}

export {
    formatProductGrade
}
const formatDate = date => {
    const newDate = new Date(date.split('T')[0].split('-'));

    const opts = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }

    return newDate.toLocaleDateString('en-EN', opts);
}

export default formatDate;
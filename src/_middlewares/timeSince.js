const aDay = 24 * 60 * 60 * 1000
console.log(timeSince(new Date(Date.now() - aDay)))
console.log(timeSince(new Date(Date.now() - aDay * 2)))

export default timeSince

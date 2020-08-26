export function GetFormattedDate(d) {
	const date = new Date(d);
	return `${monthNames[date.getMonth()]} ${date.getDate()}, ${String(
		date.getFullYear()
	).slice(2)}`;
}

const monthNames = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December",
];

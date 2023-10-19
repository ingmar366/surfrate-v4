module.exports.dateFormats = {
	short:  {day: "2-digit", month: "2-digit", year: "numeric"},
	medium: {day: "numeric", month: "long"},
	long:   {day: "numeric", month: "long", year: "numeric"}
};

module.exports.timeFormats = {
	short:  {hour: "numeric", minute: "numeric", replace: [":", "."]},
	medium: {hour: "numeric", minute: "numeric", replace: [":", "."], suffix: "u"},
	long:   {hour: "numeric", minute: "numeric", replace: [":", "."], suffix: " uur"}
};

module.exports.numberFormats = {
	integer:  {useGrouping: false, maximumFractionDigits: 0},
	decimal:  {useGrouping: false, maximumFractionDigits: 2},
	amount:   {useGrouping: true,  minimumFractionDigits: 2, maximumFractionDigits: 2},
	fraction: {useGrouping: false, minimumIntegerDigits: 2,  maximumIntegerDigits: 2}
};

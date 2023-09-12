export const TimeCalculate = (text: string) => {
	return Math.ceil(text.trim().split(/\s+/).length / 100);
};

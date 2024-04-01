

const SectionTitle = ({heading, subHeading}) => {
	return (
		<div className="md:w-4/12 text-center mx-auto py-8">
			<p className="text-yellow-600">{subHeading}</p>

			<h3 className="text-2xl md:text-3xl border-y-4 py-3 uppercase mt-3">{heading}</h3>

		</div>
	);
};

export default SectionTitle;
import "./BannerTop.css";
interface Props {
	banner: string;
}

const Bannertop = ({ banner }: Props) => {
	return (
		<div className="bannerTop">
			<img src={banner} alt="" />
		</div>
	);
};

export default Bannertop;

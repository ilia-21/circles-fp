import "./UserInfo.css";
interface Props {
	id: number;
}

const UserInfo = ({ id }: Props) => {
	id;
	return (
		<div>
			<div className="userDetails">
				<p>stats </p>
			</div>
			<div className="userDetailsAdvanced">
				<p>under construction</p>
			</div>
		</div>
	);

	//Стата:
	//Акка
	//место в мире
	//Сыгранные матчи
	//Винрейт
	//Средний матчкост
	//последние два за последние два месяца

	//Детальная стата по картам
	//Количество пиков карт по модам
	//сколько из них выиграно/проиграно
	//
};

export default UserInfo;

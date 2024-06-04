export interface Player {
	id: number;
	username: string;
	avatar_url: string;
	country: {
		code: string;
		name: string;
	};
	cover: {
		custom_url: string;
		url: string;
		id: any;
	};
}

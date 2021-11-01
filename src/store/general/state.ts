import {Account, Category, Transaction, TransactionStatus} from 'components/models';

export interface GeneralStateInterface {
	accounts: Account[];
	accountSelected: Account;
	categories: Category[];
	categorySelected: Category;
	categoriesAllowed: number[];
	categoriesDefaultAllowed: number[];
	transactions: Transaction[];
	transactionStatus: number;
}

function state(): GeneralStateInterface {
	return {
		accounts: <Account[]>[],
		accountSelected: <Account>{},
		categories: <Category[]>[],
		categorySelected: <Category>{},
		transactions: <Transaction[]>[],
		transactionStatus: TransactionStatus.INACTIVE,
		categoriesAllowed: <number[]>[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
		categoriesDefaultAllowed: <number[]>[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]
	}
};

export default state;

<template>
	<q-page>
		<q-header>
			<q-toolbar>
				<q-toolbar-title>
					Transactions
				</q-toolbar-title>
				<q-btn @click="dialog = true" flat round dense icon="filter_alt"/>

			</q-toolbar>
		</q-header>
		<q-dialog
			v-model="dialog"
			persistent
			maximized
			transition-show="slide-up"
			transition-hide="slide-down"
		>
			<q-card dark class="">
				<q-card-section>
					<div class="text-h6">Categories</div>
				</q-card-section>

				<q-card-section>
					<div class="flex justify-center">
						<q-btn
							:ripple="{ center: true }"
							no-caps
							color="blue-9"
							label="Clean all"
							@click="cleanCategories"
							class="q-mx-sm"
						/>
						<q-btn
							:ripple="{ center: true }"
							no-caps
							color="blue-9"
							label="Select all"
							@click="selectAll"
							class="q-mx-sm"
						/>
					</div>
				</q-card-section>

				<q-card-section class="q-pt-none">
					<q-option-group
						dark
						:model-value="categoriesAllowed"
						:options="categoryOptions"
						@update:model-value="changeCategoryAllowed"
						color="green"
						type="checkbox"
					/>
				</q-card-section>


				<q-card-section>
					<div class="flex justify-center">
						<q-btn
							v-close-popup
							:ripple="{ center: true }"
							no-caps
							text-color="black"
							color="grey-4"
							label="Close"
						/>
					</div>
				</q-card-section>

			</q-card>
		</q-dialog>
		<div class="q-ma-md">

			<div v-for="(months, year) of transactions" :key="year">

				<p class="year">{{ year }}</p>

				<div v-for="(transactions, month) of months" :key="month">
					<div class="flex justify-center items-center">
						<span class="month">{{ month }}</span>
						<span class="month-total"> TOTAL {{ calculateTotal(transactions) }} €</span>
					</div>
					<q-list dark>
						<q-item v-for="transaction of transactions" :key="transaction.id">

							<q-item-section>
								<q-item-label caption lines="1">
									<div class="amount">{{ transaction.amount }} €</div>
									<q-chip size="md"
											:icon="transaction.category.icon"
											:text-color="transaction.category.text_color"
											:color="transaction.category.background_color"
									>
										{{ transaction.category.name }}
									</q-chip>
								</q-item-label>
							</q-item-section>

							<q-item-section side>
								<q-item-label caption>{{ formatDate(transaction.issued_at) }}</q-item-label>
							</q-item-section>
						</q-item>
					</q-list>
				</div>
			</div>
		</div>
	</q-page>
</template>

<script lang="ts">
import {computed, defineComponent, onMounted, ref} from 'vue';
import {ActionTypes} from 'src/store/general/action-types';
import {Account, Category, Transaction} from 'components/models';
import {GetterTypes} from 'src/store/general/getter-types';
import {useStore} from 'src/store';
import {date} from 'quasar'
import {MutationTypes} from 'src/store/general/mutation-types';

export default defineComponent({
	name: 'TransactionsIndex',
	setup() {
		const store = useStore()

		let dialog = ref(false)
		onMounted(() => {
			void store.dispatch(`generalModule/${ActionTypes.GET_ALL_TRANSACTIONS}`, accountSelected.value)
			void store.dispatch(`generalModule/${ActionTypes.GET_ALL_CATEGORIES}`)

		})

		const cleanCategories = () => store.commit(`generalModule/${MutationTypes.SET_CATEGORIES_ALLOWED}`, [])

		const selectAll = () => store.commit(`generalModule/${MutationTypes.SET_CATEGORIES_ALLOWED}`, categoriesDefaultAllowed.value)

		const changeCategoryAllowed = (newCategoriesAllowed: number[]) => {
			void store.commit(`generalModule/${MutationTypes.SET_CATEGORIES_ALLOWED}`, newCategoriesAllowed)
		}

		const calculateTotal = (transactions: Transaction[]) => {
			let total = transactions
				.map((transaction: Transaction) => transaction.amount)
				.reduce((a, b) => +a + +b, 0);
			// eslint-disable-next-line @typescript-eslint/restrict-plus-operands
			return +(Math.round(Number(total + 'e+2')) + 'e-2')
		}

		const accountSelected = computed(() => <Account>store.getters[`generalModule/${GetterTypes.ACCOUNT_SELECTED}`])
		const categoryOptions = computed(() => <Category[]>store.getters[`generalModule/${GetterTypes.CATEGORIES_OPTIONS}`])
		const categoriesAllowed = computed(() => <number[]>store.getters[`generalModule/${GetterTypes.CATEGORIES_ALLOWED}`])
		const categoriesDefaultAllowed = computed(() => <number[]>store.getters[`generalModule/${GetterTypes.CATEGORIES_DEFAULT_ALLOWED}`])
		const transactions = computed(() => <Transaction[]>store.getters[`generalModule/${GetterTypes.TRANSACTIONS}`])

		const formatDate = (dateString: string): string => {
			return date.formatDate(Date.parse(dateString), 'DD-MM-YYYY')
		}

		return {
			transactions,
			formatDate,
			dialog,
			categoriesAllowed,
			categoryOptions,
			changeCategoryAllowed,
			calculateTotal,
			cleanCategories,
			selectAll
		};
	}
});
</script>

<style lang="scss" scoped>

.year {
	margin-top: 20px;
	margin-bottom: 10px;
	font-size: 1.2rem;
	font-weight: 500;
}

.month {
	text-align: center;
	margin: 15px 0;
	text-transform: uppercase;
	font-weight: 500;
}

.month-total {
	margin-left: 20px;
	font-size: .8rem;
	letter-spacing: 1px;
}

.amount {
	font-size: 1.2rem;
	font-weight: 300;
	width: 80px;
	display: inline-flex;
}

.transaction-row {

}
</style>

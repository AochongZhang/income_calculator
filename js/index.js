var app = new Vue({
    el: '#app',
    data: {
        principalInput: null,
        dayNumberInput: null,
        selectType: null,
        selectInput: null,

        principal: null,
        dayNumber: null,
        dailyIncome: null,
        dailyIncomeRate: null,
        income: null,
        incomeRate: null,
        annualizedIncome: null,
        annualRate: null,

        dailyIncomeView: null,
        dailyIncomeRateView: null,
        incomeView: null,
        incomeRateView: null,
        annualizedIncomeView: null,
        annualRateView: null,

        showAlert: false,
        alertMsg: ''
    },
    methods: {
        print() {
            this.showAlert = false
            this.dailyIncomeView = this.dailyIncome.toDP(2)
            this.dailyIncomeRateView = this.dailyIncomeRate.mul(100).toDP(2)
            this.incomeView = this.income.toDP(2)
            this.incomeRateView = this.incomeRate.mul(100).toDP(2)
            this.annualizedIncomeView = this.annualizedIncome.toDP(2)
            this.annualRateView = this.annualRate.mul(100).toDP(2)
            console.log('+-------------------------------+')
            console.log("| 本金\t\t|" + this.principal + '\t\t|')
            console.log('+-------------------------------+')
            console.log("| 平均日收益\t|" + this.dailyIncomeView + '\t\t|')
            console.log("| 平均日收益率\t|" + this.dailyIncomeRateView + "%" + '\t|')
            console.log('+-------------------------------+')
            console.log("| 投资天数\t|" + this.dayNumber + '\t\t|')
            console.log("| 总收益\t|" + this.incomeView + '\t\t|')
            console.log("| 总收益率\t|" + this.incomeRateView + "%" + '\t|')
            console.log('+-------------------------------+')
            console.log("| 年化收益\t|" + this.annualizedIncomeView + '\t\t|')
            console.log("| 年化收益率\t|" + this.annualRateView + "%" + '\t|')
            console.log('+-------------------------------+')
        },
        calc() {
            if (isNaN(this.principalInput) || this.principalInput === null || this.principalInput === 0) {
                console.error('请输入本金, 且大于0')
                this.alert('请输入本金, 且大于0')
                return
            }
            if (isNaN(this.dayNumberInput) || this.dayNumberInput === null || this.dayNumberInput === 0) {
                console.error('请输入投资天数, 且大于0')
                this.alert('请输入投资天数, 且大于0')
                return
            }
            if (isNaN(this.selectInput) || this.selectInput === null || this.selectInput === 0) {
                console.error('请选择一项输入')
                this.alert('请选择一项输入')
                return
            }
            this.principal = new Decimal(this.principalInput)
            this.dayNumber = new Decimal(this.dayNumberInput)
            switch (this.selectType) {
                case 'dailyIncome':
                    this.dailyIncomeFun()
                    break
                case 'dailyIncomeRate':
                    this.dailyIncomeRateFun()
                    break
                case 'income':
                    this.incomeFun()
                    break
                case 'incomeRate':
                    this.incomeRateFun()
                    break
                case 'annualizedIncome':
                    this.annualizedIncomeFun()
                    break
                case 'annualRate':
                    this.annualRateFun()
                    break
                default:
                    console.error('请选择正确的类型')
                    this.alert('请选择正确的类型')
                    return;
            }
            this.print()
        },
        dailyIncomeFun() {
            console.log('-- 根据日收益计算 --')
            this.dailyIncome = new Decimal(this.selectInput)
            // 日收益率 = 日收益 / 本金
            this.dailyIncomeRate = this.dailyIncome.div(this.principal)
            // 总收益 = 日收益 * 天数
            this.income = this.dailyIncome.mul(this.dayNumber)
            // 总收益率 = 总收益 / 本金
            this.incomeRate = this.income.div(this.principal)
            // 年收益 = 日收益 * 365
            this.annualizedIncome =this. dailyIncome.mul(365)
            // 年收益率 = 年收益 / 本金
            this.annualRate = this.annualizedIncome.div(this.principal)
        },
        dailyIncomeRateFun() {
            console.log('-- 根据日收益率计算 --')
            this.dailyIncomeRate = new Decimal(this.selectInput).div(100)
            // 日收益 = 日收益率 * 本金
            this.dailyIncome = this.dailyIncomeRate.mul(this.principal)
            // 总收益 = 日收益 * 天数
            this.income = this.dailyIncome.mul(this.dayNumber)
            // 总收益率 = 总收益 / 本金
            this.incomeRate = this.income.div(this.principal)
            // 年收益 = 日收益 * 365
            this.annualizedIncome = this.dailyIncome.mul(365)
            // 年收益率 = 年收益 / 本金
            this.annualRate = this.annualizedIncome.div(this.principal)
        },
        incomeFun() {
            console.log('-- 根据总收益计算 --')
            this.income = new Decimal(this.selectInput)
            // 日收益 = 总收益 / 天数
            this.dailyIncome = this.income.div(this.dayNumber)
            // 日收益率 = 日收益 / 本金
            this.dailyIncomeRate = this.dailyIncome.div(this.principal)
            // 总收益率 = 总收益 / 本金
            this.incomeRate = this.income.div(this.principal)
            // 年收益 = 日收益 * 365
            this.annualizedIncome = this.dailyIncome.mul(365)
            // 年收益率 = 年收益 / 本金
            this.annualRate = this.annualizedIncome.div(this.principal)
        },
        incomeRateFun() {
            console.log('-- 根据总收益率计算 --')
            this.incomeRate = new Decimal(this.selectInput).div(100)
            // 总收益 = 总收益率 * 本金
            this.income = this.incomeRate.mul(this.principal)
            // 日收益 = 总收益 / 天数
            this.dailyIncome = this.income.div(this.dayNumber)
            // 日收益率 = 日收益 / 本金
            this.dailyIncomeRate = this.dailyIncome.div(this.principal)
            // 年收益 = 日收益 * 365
            this.annualizedIncome = this.dailyIncome.mul(365)
            // 年收益率 = 年收益 / 本金
            this.annualRate = this.annualizedIncome.div(this.principal)
        },
        annualizedIncomeFun() {
            console.log('-- 根据年收益计算 --')
            this.annualizedIncome = new Decimal(this.selectInput)
            // 日收益 = 年收益 / 365
            this.dailyIncome = this.annualizedIncome.div(365)
            // 日收益率 = 日收益 / 本金
            this.dailyIncomeRate = this.dailyIncome.div(this.principal)
            // 总收益 = 日收益 * 天数
            this.income = this.dailyIncome.mul(this.dayNumber)
            // 总收益率 = 总收益 / 本金
            this.incomeRate = this.income.div(this.principal)
            // 年收益率 = 年收益 / 本金
            this.annualRate = this.annualizedIncome.div(this.principal)
        },
        annualRateFun() {
            console.log('-- 根据年收益率计算 --')
            this.annualRate = new Decimal(this.selectInput).div(100)
            // 年收益 = 年收益率 * 本金
            this.annualizedIncome = this.annualRate.mul(this.principal)
            // 日收益 = 年收益 / 365
            this.dailyIncome = this.annualizedIncome.div(365)
            // 日收益率 = 日收益 / 本金
            this.dailyIncomeRate = this.dailyIncome.div(this.principal)
            // 总收益 = 日收益 * 天数
            this.income = this.dailyIncome.mul(this.dayNumber)
            // 总收益率 = 总收益 / 本金
            this.incomeRate = this.income.div(this.principal)
        },
        alert(msg) {
            this.alertMsg = msg
            this.showAlert = true
        }
    }
});
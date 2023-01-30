<template>
  <div
    class="overflow-hidden gap-5 sm:grid sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4"
  >
    <stat-card
      v-if="$authorize('/users/lock')"
      color="green"
      title="User Lock Requests"
      :description="`There are ${userLock} pending user lock requests to be checked at the moment`"
      :qty="userLock"
      to="user-management/user-lock-request?status=pending"
      :loading="fetchingStats"
      icon="lock"
    />
    <stat-card
      v-if="$authorize('/back-office/billers/stage/list')"
      color="red"
      title="Biller Requests"
      :description="`There are ${biller} pending biller requests to be checked at the moment`"
      :qty="biller"
      to="/billers/requests?status=pending"
      :loading="fetchingStats"
      icon="money-bills"
    />
    <stat-card
      v-if="$authorize('/kyc/fetch')"
      color="gray"
      title="KYC Approval Requests"
      :description="`There are ${kycCount} pending KYC approval requests to be checked at the moment`"
      :qty="kycCount"
      to="/user-management/kyc/requests?status=pending"
      :loading="fetchingStats"
      icon="users-cog"
    />
    <stat-card
      v-if="$authorize('/back-office/business-rules/stage/list')"
      color="teal"
      title="Business Rule Requests"
      :description="`There are ${businessRules} pending business rules requests to be checked at the moment`"
      :qty="businessRules"
      :loading="fetchingStats"
      to="/business-rules/requests?status=pending"
      icon="scale-balanced"
    />
    <stat-card
      v-if="$authorize('/back-office/institutions/stage/list')"
      color="yellow"
      title="Institution Requests"
      :description="`There are ${institutionCount} pending institutions requests to be checked at the moment`"
      :qty="institutionCount"
      to="/institutions/requests?status=pending"
      :loading="fetchingStats"
      icon="building-columns"
    />
    <stat-card
      v-if="$authorize('/back-office/aggregators/stage/list')"
      color="blue"
      title="Aggregator Requests"
      :description="`There are ${aggregatorCount} pending aggregator requests to be checked at the moment`"
      :qty="aggregatorCount"
      :loading="fetchingStats"
      to="/aggregators/requests?status=pending"
      icon="link"
    />
    <stat-card
      v-if="$authorize('/merchants/requests')"
      color="green"
      title="Merchant Approval Requests"
      :description="`There are ${merchant} pending merchant approval requests to be checked at the moment`"
      :qty="merchant"
      to="/merchant-admin/requests?status=pending"
      :loading="fetchingStats"
      icon="shop"
    />
    <stat-card
      v-if="$authorize('/back-office/transaction-fees/stage/list')"
      color="red"
      title="Pending Transaction Fee Requests"
      to="/transactions/fees/requests?status=pending"
      :description="`There are ${transactionFee} pending transaction fee requests to be checked at the moment`"
      :qty="transactionFee"
      :loading="fetchingStats"
      icon="credit-card-alt"
    />
    <stat-card
      v-if="$authorize('/back-office/users/stage/list')"
      color="gray"
      title="Pending User Detail Requests"
      to="/user-management/users/requests?status=pending"
      :description="`There are ${userDetailCount} pending user detail requests to be checked at the moment`"
      :qty="userDetailCount"
      :loading="fetchingStats"
      icon="users"
    />
    <stat-card
      v-if="$authorize('/back-office/transactions/reverse/stage/list')"
      color="teal"
      title="Reversal Requests"
      to="/transactions/reversals/requests?status=pending"
      :description="`There are ${transactionReversals} pending transaction reversal requests to be checked at the moment`"
      :qty="transactionReversals"
      :loading="fetchingStats"
      icon="clock-rotate-left"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import StatCard from './components/StatCard'
export default {
  components: { StatCard },
  computed: {
    ...mapState('dashboard', ['stats', 'fetchingStats']),
    userLock() {
      return this.stats?.userLockCount ?? 0
    },
    biller() {
      return this.stats?.billerCount ?? 0
    },
    kycCount() {
      return this.stats?.personVerificationCount ?? 0
    },
    businessRules() {
      return this.stats?.businessRuleCount ?? 0
    },
    institutionCount() {
      return this.stats?.institutionCount ?? 0
    },
    aggregatorCount() {
      return this.stats?.aggregatorCount ?? 0
    },
    merchant() {
      return this.stats?.merchantSubmittedRequirementsCount ?? 0
    },
    transactionFee() {
      return this.stats?.transactionFeeCount ?? 0
    },
    userDetailCount() {
      return this.stats?.adminUserCount ?? 0
    },
    transactionReversals() {
      return this.stats?.manualReversalTransaction ?? 0
    },
  },
}
</script>

export interface ChangeQuotaUsedCommand {
    accountId: string
    value: number
    operation: 'add' | 'remove'
}

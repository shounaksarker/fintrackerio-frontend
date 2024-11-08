export const INCOME_CATEGORY_URL = `${process.env.SERVER_URL}/api/category/income`;
export const INCOME_SOURCE_EDIT_URL = `${process.env.SERVER_URL}/api/category/edit-income-source`;
export const INCOME_RECORD_URL = `${process.env.SERVER_URL}/api/records/income`;
export const CREATE_INCOME_RECORD_URL = `${process.env.SERVER_URL}/api/records/create-income`;
export const EDIT_INCOME_RECORD_URL = `${process.env.SERVER_URL}/api/records/edit-income`;

export const INCOME_BALANCE_TRANSFER_URL = `${process.env.SERVER_URL}/api/distribution/transfer`;
export const INCOME_DISTRIBUTION_URL = `${process.env.SERVER_URL}/api/distribution/income`;
export const CREATE_TERMINAL_URL = `${process.env.SERVER_URL}/api/distribution/create`;
export const GET_TERMINALS_URL = `${process.env.SERVER_URL}/api/distribution/all-terminals`;
export const EDIT_TERMINAL_URL = `${process.env.SERVER_URL}/api/distribution/edit-terminal`;

export const EXPENSE_CATEGORY_URL = `${process.env.SERVER_URL}/api/category/expense`;
export const EXPENSE_RECORD_URL = `${process.env.SERVER_URL}/api/records/expense`;
export const CREATE_EXPENSE_RECORD_URL = `${process.env.SERVER_URL}/api/records/create-expense`;
export const EDIT_EXPENSE_RECORD_URL = `${process.env.SERVER_URL}/api/records/edit-expense`;
export const DELETE_EXPENSE_RECORD_URL = `${process.env.SERVER_URL}/api/records/delete-expense`;
export const EXPENSE_CATEGORY_EDIT_URL = `${process.env.SERVER_URL}/api/category/edit-expense-category`;

export const GET_MONTHLY_SUMMERY_URL = `${process.env.SERVER_URL}/api/balance/monthly-summary`;
export const GET_YEARLY_SUMMERY_URL = `${process.env.SERVER_URL}/api/balance/yearly-summary`;

export const SIGNUP_URL = `${process.env.SERVER_URL}/api/auth/register`;
export const LOGIN_URL = `${process.env.SERVER_URL}/api/auth/login`;
export const EDIT_USER_URL = `${process.env.SERVER_URL}/api/user/edit`;
export const GET_USER_URL = `${process.env.SERVER_URL}/api/user/info`;

export const RESET_EMAIL_SEND_URL = `${process.env.SERVER_URL}/api/user/send-reset-email`;
export const RESET_PASSWORD_URL = `${process.env.SERVER_URL}/api/user/reset-password`;

export const CREATE_NOTE_URL = `${process.env.SERVER_URL}/api/notes/create`;
export const GET_ALL_NOTES_URL = `${process.env.SERVER_URL}/api/notes/get-all`;
export const SINGLE_NOTE_URL = `${process.env.SERVER_URL}/api/notes/:id`;

export const GET_AUTO_TRANSFER_URL = `${process.env.SERVER_URL}/api/user/get-auto-transfer`;
export const SET_AUTO_TRANSFER_URL = `${process.env.SERVER_URL}/api/user/set-auto-transfer`;
export const TRANSFER_TO_NEXT_URL = `${process.env.SERVER_URL}/api/balance/transfer-to-next-month`;

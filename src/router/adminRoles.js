const ADMIN = 1;
const REVIEW = 2;

const adminRole = {
  ADMIN, // 所有权限管理员
  REVIEW, // 审核人员
};

const adminRoleArr = [
  { name: '管理员', value: ADMIN },
  { name: '审核员', value: REVIEW },
];

export { adminRole, adminRoleArr };

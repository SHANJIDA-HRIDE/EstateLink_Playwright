function generateRoleName(prefix = 'AutoRole') {
  return `${prefix}_${Date.now()}`;
}

function generateLongText(length = 300) {
  return 'A'.repeat(length);
}

module.exports = {
  generateRoleName,
  generateLongText,
};

function generateLongText(length = 300) {
  return 'A'.repeat(length);
}

function generateRoleName() {
  return `AutoRole_${Date.now()}`;
}

module.exports = {
  generateLongText,
  generateRoleName,
};

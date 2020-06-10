
const generateDepthArray = (depth) => {
	return new Array(Math.max(depth, 0)).fill(0).map((_, index) => {
		const num = index + 1;
		const str = new Array(num).fill('children').join('.');
		return str;
	});
}

const getModelByNesting = (depth) => {
  const nestedModels = [
    'menu',
    'sub-menu',
    'sub-menu-category'
  ];
  
  const clampedDepth = Math.max(0, Math.min(depth, 3))

  return nestedModels[clampedDepth]
}


const parseNumber = (str, defaultNum) => {
  const num = parseInt(str);

  if (isNaN(num)) {
    return defaultNum;
  }

  return num;
}

module.exports = {
  generateDepthArray,
  getModelByNesting,
  parseNumber,
}


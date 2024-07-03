import { onUnmounted, reactive, ref, watch, watchEffect } from 'vue'

export function useFit(_options) {
  // let fit
  const el = ref()
  const options = reactive(_options)
  watchEffect(() => {
    if (!el.value) return
    if (!options.fit) return

    const w = el.value.offsetWidth, h = el.value.offsetHeight
    const w2 = options.target.width, h2 = options.target.height
    
    let r = 1
    let origin = ''
    
    switch (options.fit) {
      case 'contain':
        r = calcR('contain', { width: w, heigt: h }, { width: w2, heigt: h2 })
        break;
      case 'cover':
        r = calcR('cover', { width: w, heigt: h }, { width: w2, heigt: h2 })
        break
      case 'fill':
        r = [w2 / w, h2 / h]
        break
      case 'scrollY':
        r = w2 / w
        origin = 'left top'
        break
      case 'scrollX':
        r = h2 / h
        origin = 'left top'
        break
    }

    el.value.style.transform = Array.isArray(r) ? `scale(${r.join()})` : `scale(${r})`
    el.value.style.transformOrigin = origin
  })

  return { el }
}

// https://www.npmjs.com/package/intrinsic-scale?activeTab=readme
function resizeToFit(mode, source, target) {
	if (mode !== 'cover' && mode !== 'contain') {
		throw new Error('Invalid mode');
	}

	const sourceRatio = source.width / source.height;
	const targetRatio = target.width / target.height;
	let {width} = target;
	let {height} = target;

	if (mode === 'contain' ? (sourceRatio > targetRatio) : (sourceRatio < targetRatio)) {
		height = width / sourceRatio;
	} else {
		width = height * sourceRatio;
	}

	return {
		width,
		height,
		x: (target.width - width) / 2,
		y: (target.height - height) / 2,
	};
}

function calcR(mode, source, target) {
  const sourceRatio = source.width / source.height
	const targetRatio = target.width / target.height
  let { width, height } = target
  return (mode === 'contain' ? sourceRatio > targetRatio : sourceRatio < targetRatio)
    ? width / source.width
    : height / source.height
}
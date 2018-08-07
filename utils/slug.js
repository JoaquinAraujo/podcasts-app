'use strict'

import slugify from 'slugify'

export default name => slugify(name, { lower: true }).replace(/[^\w\-]+/g, '')

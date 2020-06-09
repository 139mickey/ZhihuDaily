import $ from '../libs/util'

export async function asyncGetRecommendationList () {
  const today = $.getTodayTime()
  const prevDay = $.prevDay(today + $.MILLISECONDS_PER_DAY) // 86400000)
  try {
    const response = await $.ajax.get('news/before/' + prevDay)
    return response
  } catch (e) {
    // TODO handle the exception
    console.error(e)
  }
}

function extractHostname (url) {
  var hostname
  // find & remove protocol (http, ftp, etc.) and get hostname

  if (url.indexOf('//') > -1) {
    hostname = url.split('/')[2]
  } else {
    hostname = url.split('/')[0]
  }

  // find & remove port number
  hostname = hostname.split(':')[0]
  // find & remove "?"
  hostname = hostname.split('?')[0]

  return hostname
}

export async function asyncGetArticle (id) {
  const response = await $.ajax.get('news/' + id)
  response.body = response.body.replace(/src="http/g, 'src="' + $.imgPath + 'http')
  response.body = response.body.replace(/src="https/g, 'src="' + $.imgPath + 'https')

  var imgHostName = extractHostname(response.image).split('.')[0]
  if (imgHostName === 'pic3') {
    response.image = $.imgPath + response.image
  }
  return response
}

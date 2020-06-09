import $ from '../libs/util'

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

function translateImgUrl (url) {
  return $.imgPath + url
}

export function translateArrayImgUrl (arr) {
  /*
  for (let i in arr) {
    arr[i].image = translateImgUrl(arr[i].image)
  }
  */
  arr.forEach(element => element.image = translateImgUrl(element.image))
}

export async function asyncGetLastNews () {
  try {
    const response = await $.ajax.get('news/latest')
    return response
  } catch (e) {
    // TODO handle the exception
    console.error(e)
  }
}

export async function asyncGetNewsBeforeDate (strDate) {
  try {
    const response = await $.ajax.get('news/before/' + strDate)
    return response
  } catch (e) {
    // TODO handle the exception
    console.error(e)
  }
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

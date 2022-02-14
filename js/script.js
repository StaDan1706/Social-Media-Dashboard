const toggleThemeButton = document.querySelector('.toggle')
const body = document.querySelector('body')
const allFollowers = document.querySelector('.header__heading__subtitle span')
const mainCards = Array.from(document.querySelectorAll('.main-card'))
const overwievCards = Array.from(document.querySelectorAll('.overview__card'))


// Theme changing

toggleThemeButton.addEventListener('click', () => {
  body.classList.toggle("theme-light")
})



// Data downloading and setting

const cardId = (card) => {
  return card.id
}

const userSocialName = (card) => {
  return dataArr[card.id].name
}

const totalFollowers = (card) => {
  return dataArr[card.id].data.total.followers
}

const todayFollowers = (card) => {
  return dataArr[card.id].data.today.followers
}

const todayLikes = (card) => {
  return dataArr[card.id].data.today.likes
}

const totalLikes = (card) => {
  return dataArr[card.id].data.total.likes
}

const todayPageViews = (card) => {
  return dataArr[card.id].data.today.pageViews
}

const totalPageViews = (card) => {
  return dataArr[card.id].data.total.pageViews
}


const isMainCardStatisticPositive = (card) => {
  return dataArr[card.id].data.today.followers > 0
}


const isOverwievCardStatisticPositive = (card) => {
  return isLikesPage(card) ? dataArr[card.id].data.today.likes > 0 : dataArr[card.id].data.today.pageViews > 0
}


const isLikesPage = (card) => {
  return card.classList.contains('likes')
}

const percentageOfLikes = (card) => {
  return Math.ceil((todayLikes(card) / totalLikes(card)) * 100)
}

const percentageOfPageViews = (card) => {
  return Math.ceil((todayPageViews(card) / totalPageViews(card)) * 100)
}

fetch("./data.json")
  .then((resp) => {
    return resp.json();
  })
  .then((data) => {
    dataArr = data[0]
    allFollowers.innerText = `${dataArr.totalFollowers}`


    mainCards.forEach(card => {

      card.innerHTML =
        `
        <div class="main-card__title">
          <img src="/images/icon-${cardId(card)}.svg" alt="">
          <span>${userSocialName(card)}</span>
        </div>
        <div class="main-card__followers">
          <span>${totalFollowers(card)}</span>
          <p>${cardId(card) == "youtube" ? "Subscribers" : "Followers"  }</p>
        </div>
        <div class="main-card__statistics">
          <img src=${isMainCardStatisticPositive(card) ? "/images/icon-up.svg" : "/images/icon-down.svg"} alt="">
          <span class=${isMainCardStatisticPositive(card) ? "positive-number" : "negative-number"}>
          ${todayFollowers(card)} Today
          </span>
        </div>
    `
    })

    overwievCards.forEach(card => {


      card.innerHTML =
        `
          <div class="overview__card__title">
            <span>${isLikesPage(card) ? "Likes" : "Page Views"}</span>
            <img src="/images/icon-${cardId(card)}.svg" alt="">
          </div>
          <div class="overview__card__stats">
            <span>${isLikesPage(card) ? todayLikes(card) : todayPageViews(card)}</span>
            <div class="stats__info">
              <img src=${isOverwievCardStatisticPositive(card) ? "/images/icon-up.svg" : "/images/icon-down.svg"} alt="">
              <span class=${isOverwievCardStatisticPositive(card) ? "positive-number" : "negative-number"}>
              ${isLikesPage(card) ? percentageOfLikes(card) : percentageOfPageViews(card)}%
              </span>
            </div>
          </div>
        `
    })
  });
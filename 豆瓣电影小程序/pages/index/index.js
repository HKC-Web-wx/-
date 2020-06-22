//index.js
//获取应用实例
import { network } from "../../utils/network.js";
const app = getApp()

Page({
  data: {
    item: {
      cover: {
        url: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1581654839849&di=7daafbe7d5a57121340d08c8ffd73632&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201802%2F20%2F20180220165946_RiGPS.thumb.700_0.jpeg"
      },
      rating: {
        value: 6.7
      },
      title: "jarvis"
    },
    movies: [{
      cover: {
        url: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1581654839849&di=7daafbe7d5a57121340d08c8ffd73632&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201802%2F20%2F20180220165946_RiGPS.thumb.700_0.jpeg"
      },
      rating: {
        value: 6.7
      },
      title: "jarvis"
    }, {
      cover: {
        url: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1581654839849&di=7daafbe7d5a57121340d08c8ffd73632&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201802%2F20%2F20180220165946_RiGPS.thumb.700_0.jpeg"
      },
      rating: {
        value: 6.7
      },
      title: "jarvis"
    }, {
      cover: {
        url: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1581654839849&di=7daafbe7d5a57121340d08c8ffd73632&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201802%2F20%2F20180220165946_RiGPS.thumb.700_0.jpeg"
      },
      rating: {
        value: 6.7
      },
      title: "jarvis"
    }],
    comments: [
      {
        user: {
          avatar: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1581654839849&di=7daafbe7d5a57121340d08c8ffd73632&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201802%2F20%2F20180220165946_RiGPS.thumb.700_0.jpeg",
          name: 'jarvis'
        },
        rating: {
          value: 6.3
        },
        create_time: "2019-12-11 12:32:11",
        comment: "这个电影太好看了"
      },
      {
        user: {
          avatar: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1581654839849&di=7daafbe7d5a57121340d08c8ffd73632&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201802%2F20%2F20180220165946_RiGPS.thumb.700_0.jpeg",
          name: 'jarvis'
        },
        rating: {
          value: 6.3
        },
        create_time: "2019-12-11 12:32:11",
        comment: "这个电影太好看了"
      }
    ]

  },
  onLoad: function (options) {
    var that = this;
    // 电影
    network.getMovieList({
      success: function (movies) {
        that.setData({
          movies: movies
        });
      }
    });
    // 电视剧
    network.getTVList({
      success: function (tvs) {
        that.setData({
          tvs: tvs
        });
      }
    });
    // 综艺
    network.getShowList({
      success: function (shows) {
        that.setData({
          shows: shows
        });
      }
    });
  },
})

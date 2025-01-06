const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const colors = require("./../constant/color.constant");
const productType = require("./../constant/product-type.constant");
const shirtSizes = require("./../constant/shirt-size.constant");
require("dotenv").config();

const ProductCategory = require("./../models/product-category.model");
const Product = require("./../models/product.model");
const User = require("./../models/user.model");
const Comment = require("./../models/comment.model");
const Manufacturer = require("./../models/manufacturer.model");
const Order = require("./../models/order.model");
const Cart = require("./../models/cart.model");
const OrderItem = require("./../models/order-item.model");
const ProductStock = require("./../models/product-stock.model");
const pantSizes = require("../constant/pant-size.constant");

mongoose
  .connect(process.env.MONGODB_URL || "mongodb://root:root@localhost:27017")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB", err);
  });
const mockUsers = [
  {
    email: "pngbao20@clc.fitus.edu.vn",
    password: "admin123",
    firstName: "Pham",
    lastName: "Bao",
    birthDate: "12/20/2002",
    gender: "Male",
    avatar:
      "https://web.facebook.com/photo/?fbid=1084508913058780&set=a.105473897628958",
    isAdmin: true,
    isVerified: true,
  },
  {
    email: "rbutters0@icq.com",
    password: 'eU5"+xp1$m7"u',
    firstName: "Rowena",
    lastName: "Butters",
    birthDate: "6/20/1996",
    gender: "Female",
    avatar: "https://robohash.org/omnisauttenetur.png?size=50x50&set=set1",
    isAdmin: false,
    isVerified: true,
  },
  {
    email: "llimming1@github.io",
    password: "rS3$HA,T",
    firstName: "Lyn",
    lastName: "Limming",
    birthDate: "9/26/1997",
    gender: "Agender",
    avatar: "https://robohash.org/inutitaque.png?size=50x50&set=set1",
    isAdmin: false,
    isVerified: true,
  },
  {
    email: "ckippie2@sina.com.cn",
    password: "zD8#dE1q",
    firstName: "Cornie",
    lastName: "Kippie",
    birthDate: "6/18/1996",
    gender: "Female",
    avatar: "https://robohash.org/fugitipsammolestiae.png?size=50x50&set=set1",
    isAdmin: false,
    isVerified: true,
  },
  {
    email: "lsouthwick3@privacy.gov.au",
    password: "iO9$/V>b",
    firstName: "Loren",
    lastName: "Southwick",
    birthDate: "12/17/1995",
    gender: "Male",
    avatar: "https://robohash.org/quossedanimi.png?size=50x50&set=set1",
    isAdmin: false,
    isVerified: true,
  },
  {
    email: "ddencs4@ehow.com",
    password: "mL9).#Rv",
    firstName: "Demetre",
    lastName: "Dencs",
    birthDate: "7/14/2002",
    gender: "Male",
    avatar: "https://robohash.org/estaliquidmolestiae.png?size=50x50&set=set1",
    isAdmin: false,
    isVerified: true,
  },
  {
    email: "mbuckland5@fotki.com",
    password: "xR7#PMjn>",
    firstName: "Marris",
    lastName: "Buckland",
    birthDate: "8/4/2002",
    gender: "Female",
    avatar:
      "https://robohash.org/autemsimiliquevoluptatem.png?size=50x50&set=set1",
    isAdmin: false,
    isVerified: true,
  },
  {
    email: "dohartnett6@creativecommons.org",
    password: "mP0%qyp&",
    firstName: "Dal",
    lastName: "O'Hartnett",
    birthDate: "7/31/1999",
    gender: "Male",
    avatar:
      "https://robohash.org/consequunturofficiisat.png?size=50x50&set=set1",
    isAdmin: false,
    isVerified: true,
  },
  {
    email: "ojopke7@cloudflare.com",
    password: "bI7(pr\\f0p1o",
    firstName: "Oralie",
    lastName: "Jopke",
    birthDate: "1/11/1993",
    gender: "Genderfluid",
    avatar: "https://robohash.org/etabquidem.png?size=50x50&set=set1",
    isAdmin: false,
    isVerified: true,
  },
  {
    email: "nisakowicz8@ox.ac.uk",
    password: "dR4,q|#@@",
    firstName: "Natalie",
    lastName: "Isakowicz",
    birthDate: "9/18/1999",
    gender: "Female",
    avatar: "https://robohash.org/quamminuspariatur.png?size=50x50&set=set1",
    isAdmin: false,
    isVerified: true,
  },
  {
    email: "ctungate9@list-manage.com",
    password: "jX1*p3g&s",
    firstName: "Cleavland",
    lastName: "Tungate",
    birthDate: "10/9/1995",
    gender: "Male",
    avatar: "https://robohash.org/eligendisaepedolor.png?size=50x50&set=set1",
    isAdmin: false,
    isVerified: true,
  },
  {
    email: "sbowsera@ustream.tv",
    password: 'vN3"n4~{M+',
    firstName: "Sande",
    lastName: "Bowser",
    birthDate: "1/2/1991",
    gender: "Female",
    avatar: "https://robohash.org/autquasdoloremque.png?size=50x50&set=set1",
    isAdmin: false,
    isVerified: true,
  },
  {
    email: "pelintuneb@is.gd",
    password: "bL4_2y1`xe",
    firstName: "Paule",
    lastName: "Elintune",
    birthDate: "12/7/1996",
    gender: "Female",
    avatar:
      "https://robohash.org/etconsequatureligendi.png?size=50x50&set=set1",
    isAdmin: false,
    isVerified: true,
  },
  {
    email: "mmurtyc@virginia.edu",
    password: "tJ6#(*#Yu>TD+PnX",
    firstName: "Murray",
    lastName: "Murty",
    birthDate: "11/4/1990",
    gender: "Male",
    avatar: "https://robohash.org/nostrumrecusandaeet.png?size=50x50&set=set1",
    isAdmin: false,
    isVerified: true,
  },
  {
    email: "rcoslettd@miitbeian.gov.cn",
    password: "yE9,+(g*@&g",
    firstName: "Rob",
    lastName: "Coslett",
    birthDate: "8/17/2000",
    gender: "Male",
    avatar: "https://robohash.org/quiquiperferendis.png?size=50x50&set=set1",
    isAdmin: false,
    isVerified: true,
  },
  {
    email: "gsproate@globo.com",
    password: "qS0_C<69`8{",
    firstName: "Godiva",
    lastName: "Sproat",
    birthDate: "11/16/1997",
    gender: "Female",
    avatar: "https://robohash.org/sedlaudantiumeum.png?size=50x50&set=set1",
    isAdmin: false,
    isVerified: true,
  },
  {
    email: "nchadwellf@marriott.com",
    password: "eN1|`E3gT*o!D<",
    firstName: "Nicol",
    lastName: "Chadwell",
    birthDate: "1/30/1999",
    gender: "Male",
    avatar: "https://robohash.org/minimasuscipitut.png?size=50x50&set=set1",
    isAdmin: false,
    isVerified: true,
  },
  {
    email: "ssivillg@buzzfeed.com",
    password: "rF2&3K#s",
    firstName: "Susann",
    lastName: "Sivill",
    birthDate: "5/2/1993",
    gender: "Female",
    avatar: "https://robohash.org/quiliberoearum.png?size=50x50&set=set1",
    isAdmin: false,
    isVerified: true,
  },
  {
    email: "gchatainierh@yahoo.co.jp",
    password: "aW4|A2r$nf",
    firstName: "Gay",
    lastName: "Chatainier",
    birthDate: "4/30/2002",
    gender: "Male",
    avatar: "https://robohash.org/architectoquamaut.png?size=50x50&set=set1",
    isAdmin: false,
    isVerified: true,
  },
  {
    email: "mchettlei@google.com.au",
    password: "rM8?\\9wKO~",
    firstName: "Moise",
    lastName: "Chettle",
    birthDate: "1/29/1996",
    gender: "Male",
    avatar: "https://robohash.org/autetsit.png?size=50x50&set=set1",
    isAdmin: false,
    isVerified: true,
  },
  {
    email: "tdochertyj@icq.com",
    password: "xC7*a$6<XFRq+\\",
    firstName: "Tuckie",
    lastName: "Docherty",
    birthDate: "11/8/1994",
    gender: "Male",
    avatar: "https://robohash.org/omnismagnamfugit.png?size=50x50&set=set1",
    isAdmin: false,
    isVerified: true,
  },
  {
    email: "ystuckowk@imgur.com",
    password: "oJ9=Y.%ecBB<cR",
    firstName: "Yehudi",
    lastName: "Stuckow",
    birthDate: "12/14/2000",
    gender: "Male",
    avatar: "https://robohash.org/nihilmaioressequi.png?size=50x50&set=set1",
    isAdmin: false,
    isVerified: true,
  },
  {
    email: "msawardl@vinaora.com",
    password: "eB3<M.35s",
    firstName: "Merla",
    lastName: "Saward",
    birthDate: "4/26/2003",
    gender: "Female",
    avatar: "https://robohash.org/quoquiullam.png?size=50x50&set=set1",
    isAdmin: false,
    isVerified: true,
  },
  {
    email: "zmcguinleym@flavors.me",
    password: "zG1(%\\n{~/",
    firstName: "Zebedee",
    lastName: "McGuinley",
    birthDate: "6/28/1994",
    gender: "Male",
    avatar: "https://robohash.org/abpariatureos.png?size=50x50&set=set1",
    isAdmin: false,
    isVerified: true,
  },
  {
    email: "rtiptonn@gizmodo.com",
    password: "nZ3<(8r`=\\m7T1",
    firstName: "Rogers",
    lastName: "Tipton",
    birthDate: "7/19/2001",
    gender: "Bigender",
    avatar: "https://robohash.org/minusporroqui.png?size=50x50&set=set1",
    isAdmin: false,
    isVerified: true,
  },
  {
    email: "jglyneo@reverbnation.com",
    password: "lC1$n~|)mKyn",
    firstName: "Juline",
    lastName: "Glyne",
    birthDate: "4/9/2002",
    gender: "Female",
    avatar: "https://robohash.org/minimainventoresed.png?size=50x50&set=set1",
    isAdmin: false,
    isVerified: true,
  },
  {
    email: "rcecerep@elegantthemes.com",
    password: "kW5)X~`Im",
    firstName: "Reid",
    lastName: "Cecere",
    birthDate: "9/30/1995",
    gender: "Male",
    avatar: "https://robohash.org/cupiditatecumqueaut.png?size=50x50&set=set1",
    isAdmin: false,
    isVerified: true,
  },
  {
    email: "mclaidenq@usatoday.com",
    password: 'oE5"Z\\7th',
    firstName: "Marietta",
    lastName: "Claiden",
    birthDate: "4/26/1993",
    gender: "Male",
    avatar:
      "https://robohash.org/possimusaspernaturmolestiae.png?size=50x50&set=set1",
    isAdmin: false,
    isVerified: true,
  },
  {
    email: "tcallingtonr@sohu.com",
    password: "uL0&3m4|nZ9B",
    firstName: "Tristam",
    lastName: "Callington",
    birthDate: "3/8/1999",
    gender: "Male",
    avatar: "https://robohash.org/excepturicumdolorem.png?size=50x50&set=set1",
    isAdmin: false,
    isVerified: true,
  },
  {
    email: "crenons@youku.com",
    password: "kV7~Y<'Q|DjAN5_",
    firstName: "Carri",
    lastName: "Renon",
    birthDate: "9/13/2003",
    gender: "Female",
    avatar:
      "https://robohash.org/laborumpariaturaliquid.png?size=50x50&set=set1",
    isAdmin: false,
    isVerified: true,
  },
  {
    email: "hwastellt@npr.org",
    password: "mM9$2v,@AW)",
    firstName: "Hedda",
    lastName: "Wastell",
    birthDate: "7/20/2004",
    gender: "Polygender",
    avatar: "https://robohash.org/eaqueenimdolor.png?size=50x50&set=set1",
    isAdmin: false,
    isVerified: true,
  },
  {
    email: "tvenneuru@is.gd",
    password: "kN1'WnAMq\"{~XLW",
    firstName: "Tabby",
    lastName: "Venneur",
    birthDate: "2/17/1993",
    gender: "Female",
    avatar: "https://robohash.org/maximeeosaperiam.png?size=50x50&set=set1",
    isAdmin: false,
    isVerified: true,
  },
  {
    email: "ahanabyv@ameblo.jp",
    password: "pO4$9s997Q?V_L",
    firstName: "Archaimbaud",
    lastName: "Hanaby",
    birthDate: "12/23/2002",
    gender: "Male",
    avatar: "https://robohash.org/laboriosamquivel.png?size=50x50&set=set1",
    isAdmin: false,
    isVerified: true,
  },
  {
    email: "ostandonw@vk.com",
    password: "iW4/lz!r|#44P2",
    firstName: "Ollie",
    lastName: "Standon",
    birthDate: "11/26/1993",
    gender: "Genderfluid",
    avatar:
      "https://robohash.org/recusandaeexercitationemminima.png?size=50x50&set=set1",
    isAdmin: false,
    isVerified: true,
  },
  {
    email: "dthebeaux@yandex.ru",
    password: "zA0.z{JD.r,E_~",
    firstName: "Donna",
    lastName: "Thebeau",
    birthDate: "5/3/2005",
    gender: "Bigender",
    avatar:
      "https://robohash.org/veritatisvoluptatemvelit.png?size=50x50&set=set1",
    isAdmin: false,
    isVerified: true,
  },
  {
    email: "arably@jimdo.com",
    password: "aD3\\?*d@'6t!F<",
    firstName: "Anatola",
    lastName: "Rabl",
    birthDate: "2/8/1996",
    gender: "Female",
    avatar:
      "https://robohash.org/architectooccaecatiet.png?size=50x50&set=set1",
    isAdmin: false,
    isVerified: true,
  },
  {
    email: "caudusz@reddit.com",
    password: "rX2*5kCNjPog",
    firstName: "Celestina",
    lastName: "Audus",
    birthDate: "3/25/1998",
    gender: "Female",
    avatar: "https://robohash.org/laborumatanimi.png?size=50x50&set=set1",
    isAdmin: false,
    isVerified: true,
  },
  {
    email: "pmichiel10@amazon.co.uk",
    password: "cU9=0#tAL|C",
    firstName: "Pierette",
    lastName: "Michiel",
    birthDate: "3/8/1993",
    gender: "Non-binary",
    avatar:
      "https://robohash.org/repudiandaevoluptatemveritatis.png?size=50x50&set=set1",
    isAdmin: false,
    isVerified: true,
  },
  {
    email: "hmccahey11@google.nl",
    password: "xT5)q!)k'G",
    firstName: "Helga",
    lastName: "Mc Cahey",
    birthDate: "11/19/1998",
    gender: "Female",
    avatar: "https://robohash.org/nobisetquia.png?size=50x50&set=set1",
    isAdmin: false,
    isVerified: true,
  },
  {
    email: "jriggott12@plala.or.jp",
    password: "jE7+\\R7y",
    firstName: "Jo",
    lastName: "Riggott",
    birthDate: "11/7/2004",
    gender: "Male",
    avatar:
      "https://robohash.org/accusamuseaaspernatur.png?size=50x50&set=set1",
    isAdmin: false,
    isVerified: true,
  },
  {
    email: "jbevan13@elegantthemes.com",
    password: "yU9#@Go~2I",
    firstName: "Joete",
    lastName: "Bevan",
    birthDate: "1/20/1991",
    gender: "Female",
    avatar: "https://robohash.org/ipsametlabore.png?size=50x50&set=set1",
    isAdmin: false,
    isVerified: true,
  },
  {
    email: "tkayes14@usda.gov",
    password: "qY6+8={x&Y3d",
    firstName: "Tandy",
    lastName: "Kayes",
    birthDate: "9/16/1990",
    gender: "Female",
    avatar: "https://robohash.org/adipisciineius.png?size=50x50&set=set1",
    isAdmin: false,
    isVerified: true,
  },
  {
    email: "hantonetti15@boston.com",
    password: "kA3`_,lv.}",
    firstName: "Hewie",
    lastName: "Antonetti",
    birthDate: "12/29/1996",
    gender: "Male",
    avatar:
      "https://robohash.org/estadipisciconsectetur.png?size=50x50&set=set1",
    isAdmin: false,
    isVerified: true,
  },
  {
    email: "rfrayling16@va.gov",
    password: "yV2#e>ro&xa&",
    firstName: "Reggie",
    lastName: "Frayling",
    birthDate: "4/4/2001",
    gender: "Male",
    avatar: "https://robohash.org/enimquoautem.png?size=50x50&set=set1",
    isAdmin: false,
    isVerified: true,
  },
  {
    email: "rgrattage17@reverbnation.com",
    password: "zY0_XV|~E1?@",
    firstName: "Reggi",
    lastName: "Grattage",
    birthDate: "12/10/1991",
    gender: "Non-binary",
    avatar:
      "https://robohash.org/repudiandaeperspiciatisqui.png?size=50x50&set=set1",
    isAdmin: false,
    isVerified: true,
  },
  {
    email: "zbrundall18@etsy.com",
    password: "rP5!oBs7}i0m2E",
    firstName: "Zachary",
    lastName: "Brundall",
    birthDate: "4/6/1994",
    gender: "Male",
    avatar:
      "https://robohash.org/reprehenderitdoloreut.png?size=50x50&set=set1",
    isAdmin: false,
    isVerified: true,
  },
  {
    email: "zskryne19@npr.org",
    password: "nF1#?J&|xw5",
    firstName: "Zolly",
    lastName: "Skryne",
    birthDate: "10/24/1991",
    gender: "Bigender",
    avatar: "https://robohash.org/doloremquequierror.png?size=50x50&set=set1",
    isAdmin: false,
    isVerified: true,
  },
  {
    email: "bvennard1a@hibu.com",
    password: "bI3(2.g`VK~H",
    firstName: "Brandais",
    lastName: "Vennard",
    birthDate: "6/3/2005",
    gender: "Female",
    avatar: "https://robohash.org/autestasperiores.png?size=50x50&set=set1",
    isAdmin: false,
    isVerified: true,
  },
  {
    email: "gwaller1b@webeden.co.uk",
    password: "nO4}<N72",
    firstName: "Gale",
    lastName: "Waller",
    birthDate: "4/15/2005",
    gender: "Male",
    avatar: "https://robohash.org/quiadoloremqui.png?size=50x50&set=set1",
    isAdmin: false,
    isVerified: true,
  },
  {
    email: "olemonnier1c@cnet.com",
    password: "yF2=j/Ng(nblcnT",
    firstName: "Otes",
    lastName: "Lemonnier",
    birthDate: "8/10/2004",
    gender: "Male",
    avatar: "https://robohash.org/namsuntaliquam.png?size=50x50&set=set1",
    isAdmin: false,
    isVerified: true,
  },
  {
    email: "bmatejic1d@networkadvertising.org",
    password: 'dS3\\"1Mr8Ie',
    firstName: "Bret",
    lastName: "Matejic",
    birthDate: "1/10/1994",
    gender: "Bigender",
    avatar: "https://robohash.org/atquemollitiaest.png?size=50x50&set=set1",
    isAdmin: false,
    isVerified: true,
  },
  {
    email: "whilldrop1e@twitter.com",
    password: "eX4,H,T+LAh~S{f",
    firstName: "Winnie",
    lastName: "Hilldrop",
    birthDate: "5/21/1998",
    gender: "Female",
    avatar: "https://robohash.org/quodsuscipitoptio.png?size=50x50&set=set1",
    isAdmin: false,
    isVerified: true,
  },
  {
    email: "dcrim1f@webnode.com",
    password: "yD6($7oD5YqM,",
    firstName: "Doti",
    lastName: "Crim",
    birthDate: "2/23/2002",
    gender: "Female",
    avatar:
      "https://robohash.org/corruptirecusandaeaut.png?size=50x50&set=set1",
    isAdmin: false,
    isVerified: true,
  },
  {
    email: "rdavidovits1g@creativecommons.org",
    password: 'mM3~M=,SwL_#l&"S',
    firstName: "Romy",
    lastName: "Davidovits",
    birthDate: "7/23/1999",
    gender: "Female",
    avatar: "https://robohash.org/etdolorescorrupti.png?size=50x50&set=set1",
    isAdmin: false,
    isVerified: true,
  },
  {
    email: "sneward1h@pcworld.com",
    password: "qG0!OTRz",
    firstName: "Shanta",
    lastName: "Neward",
    birthDate: "5/26/2004",
    gender: "Female",
    avatar: "https://robohash.org/fugiatistemagni.png?size=50x50&set=set1",
    isAdmin: false,
    isVerified: true,
  },
  {
    email: "hmillington1i@forbes.com",
    password: "jH0$SrbqmA&",
    firstName: "Hy",
    lastName: "Millington",
    birthDate: "5/3/2005",
    gender: "Male",
    avatar:
      "https://robohash.org/distinctioperferendisvitae.png?size=50x50&set=set1",
    isAdmin: false,
    isVerified: true,
  },
  {
    email: "lrolfe1j@thetimes.co.uk",
    password: "pB7&SQ=3?V",
    firstName: "Leila",
    lastName: "Rolfe",
    birthDate: "5/15/2000",
    gender: "Female",
    avatar: "https://robohash.org/abullamtotam.png?size=50x50&set=set1",
    isAdmin: false,
    isVerified: true,
  },
  {
    email: "rfeirn1k@themeforest.net",
    password: "dW5'p3X~",
    firstName: "Rozanna",
    lastName: "Feirn",
    birthDate: "2/12/1998",
    gender: "Female",
    avatar: "https://robohash.org/magniprovidentcumque.png?size=50x50&set=set1",
    isAdmin: false,
    isVerified: true,
  },
  {
    email: "lfewkes1l@cisco.com",
    password: "tX7=.xDvhi",
    firstName: "Lew",
    lastName: "Fewkes",
    birthDate: "12/7/1991",
    gender: "Male",
    avatar: "https://robohash.org/essemagnamrerum.png?size=50x50&set=set1",
    isAdmin: false,
    isVerified: true,
  },
  {
    email: "ckeating1m@deliciousdays.com",
    password: "sC6*\\U9YBa*",
    firstName: "Carr",
    lastName: "Keating",
    birthDate: "10/8/1993",
    gender: "Male",
    avatar: "https://robohash.org/nihilquamvoluptatem.png?size=50x50&set=set1",
    isAdmin: false,
    isVerified: true,
  },
  {
    email: "ilossman1n@yahoo.co.jp",
    password: "nA6{$JqccRh*e6",
    firstName: "Ivar",
    lastName: "Lossman",
    birthDate: "12/29/2002",
    gender: "Male",
    avatar:
      "https://robohash.org/voluptatemdistinctioaut.png?size=50x50&set=set1",
    isAdmin: false,
    isVerified: true,
  },
  {
    email: "wtearney1o@networksolutions.com",
    password: "qR4.nFcM!",
    firstName: "Wendie",
    lastName: "Tearney",
    birthDate: "6/26/1994",
    gender: "Female",
    avatar: "https://robohash.org/dictatotampariatur.png?size=50x50&set=set1",
    isAdmin: false,
    isVerified: true,
  },
  {
    email: "bcromar1p@devhub.com",
    password: "vM1/t!TE`K1O1so9",
    firstName: "Bret",
    lastName: "Cromar",
    birthDate: "10/7/1998",
    gender: "Male",
    avatar: "https://robohash.org/idodionisi.png?size=50x50&set=set1",
    isAdmin: false,
    isVerified: true,
  },
  {
    email: "kpettegre1q@tripod.com",
    password: "vP1'Zm8X",
    firstName: "Kelley",
    lastName: "Pettegre",
    birthDate: "8/4/1993",
    gender: "Male",
    avatar: "https://robohash.org/autaperiamdoloremque.png?size=50x50&set=set1",
    isAdmin: false,
    isVerified: true,
  },
  {
    email: "bfehners1r@wiley.com",
    password: "cG1{SKZ)$a",
    firstName: "Brendan",
    lastName: "Fehners",
    birthDate: "5/28/1997",
    gender: "Male",
    avatar:
      "https://robohash.org/dolormolestiasdolorem.png?size=50x50&set=set1",
    isAdmin: false,
    isVerified: true,
  },
  {
    email: "dhartington1s@answers.com",
    password: "yZ6)/YrNwR",
    firstName: "Danita",
    lastName: "Hartington",
    birthDate: "10/8/2005",
    gender: "Female",
    avatar: "https://robohash.org/inciduntnamsed.png?size=50x50&set=set1",
    isAdmin: false,
    isVerified: true,
  },
  {
    email: "ughio1t@rakuten.co.jp",
    password: "xW4=eaLHx+K8$5",
    firstName: "Urbano",
    lastName: "Ghio",
    birthDate: "7/7/1994",
    gender: "Male",
    avatar: "https://robohash.org/numquametaut.png?size=50x50&set=set1",
    isAdmin: false,
    isVerified: true,
  },
  {
    email: "tpoletto1u@unc.edu",
    password: "jB1\\%(8h,JBGIU",
    firstName: "Tabbatha",
    lastName: "Poletto",
    birthDate: "3/5/2004",
    gender: "Female",
    avatar: "https://robohash.org/etnonillo.png?size=50x50&set=set1",
    isAdmin: false,
    isVerified: true,
  },
  {
    email: "rwilton1v@ebay.co.uk",
    password: "bJ9@aMVXc=V0",
    firstName: "Rosa",
    lastName: "Wilton",
    birthDate: "12/5/1990",
    gender: "Female",
    avatar: "https://robohash.org/ducimusquasirerum.png?size=50x50&set=set1",
    isAdmin: false,
    isVerified: true,
  },
  {
    email: "mbell1w@go.com",
    password: "kR3`9van_fVY",
    firstName: "Marylou",
    lastName: "Bell",
    birthDate: "12/14/1999",
    gender: "Female",
    avatar: "https://robohash.org/commodisitfugit.png?size=50x50&set=set1",
    isAdmin: false,
    isVerified: true,
  },
  {
    email: "atotman1x@state.tx.us",
    password: 'fT7"~~vPx',
    firstName: "Auria",
    lastName: "Totman",
    birthDate: "6/22/1999",
    gender: "Female",
    avatar: "https://robohash.org/providentnonharum.png?size=50x50&set=set1",
    isAdmin: false,
    isVerified: true,
  },
  {
    email: "nveness1y@biblegateway.com",
    password: 'dA0,?"e7x*UR3',
    firstName: "Nan",
    lastName: "Veness",
    birthDate: "9/28/2001",
    gender: "Female",
    avatar: "https://robohash.org/facilisquidemsint.png?size=50x50&set=set1",
    isAdmin: false,
    isVerified: true,
  },
  {
    email: "tthom1z@prweb.com",
    password: "qL8!?H35?i,O<'",
    firstName: "Tris",
    lastName: "Thom",
    birthDate: "10/2/1994",
    gender: "Male",
    avatar: "https://robohash.org/autininventore.png?size=50x50&set=set1",
    isAdmin: false,
    isVerified: true,
  },
  {
    email: "llohden20@technorati.com",
    password: "cZ3*>gK$r8C",
    firstName: "Legra",
    lastName: "Lohden",
    birthDate: "7/28/1995",
    gender: "Female",
    avatar:
      "https://robohash.org/occaecatiducimusmolestiae.png?size=50x50&set=set1",
    isAdmin: false,
    isVerified: true,
  },
  {
    email: "asach21@newyorker.com",
    password: "iX1?83n@s",
    firstName: "Annecorinne",
    lastName: "Sach",
    birthDate: "7/1/1998",
    gender: "Female",
    avatar: "https://robohash.org/hicautemsunt.png?size=50x50&set=set1",
    isAdmin: false,
    isVerified: true,
  },
  {
    email: "bstaziker22@purevolume.com",
    password: "nI6'3>I3*I9uWJMa",
    firstName: "Beltran",
    lastName: "Staziker",
    birthDate: "8/20/1995",
    gender: "Male",
    avatar: "https://robohash.org/necessitatibusutsit.png?size=50x50&set=set1",
    isAdmin: false,
    isVerified: true,
  },
  {
    email: "wlodewick23@ucsd.edu",
    password: "rS8\\3H`XqRB",
    firstName: "Westbrook",
    lastName: "Lodewick",
    birthDate: "3/29/1997",
    gender: "Male",
    avatar:
      "https://robohash.org/repellendusquisquamut.png?size=50x50&set=set1",
    isAdmin: false,
    isVerified: true,
  },
  {
    email: "cbrient24@hp.com",
    password: "tA6@?D\\j)wc#z}\\$",
    firstName: "Chip",
    lastName: "Brient",
    birthDate: "2/10/1999",
    gender: "Male",
    avatar:
      "https://robohash.org/occaecatiassumendamodi.png?size=50x50&set=set1",
    isAdmin: false,
    isVerified: true,
  },
  {
    email: "ahevey25@opera.com",
    password: "oN0#RGhcf",
    firstName: "Aurelie",
    lastName: "Hevey",
    birthDate: "2/27/2001",
    gender: "Female",
    avatar: "https://robohash.org/quisofficiaoccaecati.png?size=50x50&set=set1",
    isAdmin: false,
    isVerified: true,
  },
  {
    email: "btylor26@goo.gl",
    password: "lJ4*?_Z\\\\UFsk@",
    firstName: "Barbaraanne",
    lastName: "Tylor",
    birthDate: "3/17/1996",
    gender: "Female",
    avatar: "https://robohash.org/officiaundesed.png?size=50x50&set=set1",
    isAdmin: false,
    isVerified: true,
  },
  {
    email: "llashford27@com.com",
    password: "hW6\\cgpo",
    firstName: "Land",
    lastName: "Lashford",
    birthDate: "6/19/2003",
    gender: "Male",
    avatar: "https://robohash.org/autsitmagni.png?size=50x50&set=set1",
    isAdmin: false,
    isVerified: true,
  },
  {
    email: "mkigelman28@webeden.co.uk",
    password: "tI7+?DNYq",
    firstName: "Munroe",
    lastName: "Kigelman",
    birthDate: "12/17/1991",
    gender: "Male",
    avatar:
      "https://robohash.org/delectusharumassumenda.png?size=50x50&set=set1",
    isAdmin: false,
    isVerified: true,
  },
  {
    email: "atippett29@hp.com",
    password: "dG2<{Qp'cAeaxBa",
    firstName: "Annmaria",
    lastName: "Tippett",
    birthDate: "3/12/1994",
    gender: "Female",
    avatar: "https://robohash.org/quasiharumut.png?size=50x50&set=set1",
    isAdmin: false,
    isVerified: true,
  },
  {
    email: "hgencke2a@wired.com",
    password: "yI3_Xt$66f7Eif",
    firstName: "Hayden",
    lastName: "Gencke",
    birthDate: "1/9/2005",
    gender: "Male",
    avatar: "https://robohash.org/sintmaximeut.png?size=50x50&set=set1",
    isAdmin: false,
    isVerified: true,
  },
  {
    email: "nsineath2b@msn.com",
    password: "iV2`BH*50!Pj\\L",
    firstName: "Nomi",
    lastName: "Sineath",
    birthDate: "5/22/1993",
    gender: "Female",
    avatar: "https://robohash.org/ipsumeosrepellat.png?size=50x50&set=set1",
    isAdmin: false,
    isVerified: true,
  },
  {
    email: "rdymick2c@wikipedia.org",
    password: "rL8<Y9w7+Fs~2$",
    firstName: "Rafi",
    lastName: "Dymick",
    birthDate: "12/11/1990",
    gender: "Male",
    avatar:
      "https://robohash.org/similiquevoluptatemharum.png?size=50x50&set=set1",
    isAdmin: false,
    isVerified: true,
  },
  {
    email: "njaniszewski2d@odnoklassniki.ru",
    password: "oE9&S%UWW$F|k>iQ",
    firstName: "Nathalie",
    lastName: "Janiszewski",
    birthDate: "10/19/1995",
    gender: "Female",
    avatar: "https://robohash.org/quisquamnamdeserunt.png?size=50x50&set=set1",
    isAdmin: false,
    isVerified: true,
  },
  {
    email: "lheasley2e@tamu.edu",
    password: 'vW8`,"pya_X2L',
    firstName: "Lelia",
    lastName: "Heasley",
    birthDate: "7/16/1992",
    gender: "Female",
    avatar: "https://robohash.org/quidemquivel.png?size=50x50&set=set1",
    isAdmin: false,
    isVerified: true,
  },
  {
    email: "edenyagin2f@tiny.cc",
    password: "wT5,a(6@|G={e",
    firstName: "Emera",
    lastName: "Denyagin",
    birthDate: "4/25/1992",
    gender: "Female",
    avatar: "https://robohash.org/cumquiaeaque.png?size=50x50&set=set1",
    isAdmin: false,
    isVerified: true,
  },
  {
    email: "asergean2g@unc.edu",
    password: "jD2#ZZ/KD",
    firstName: "Arty",
    lastName: "Sergean",
    birthDate: "6/1/1991",
    gender: "Male",
    avatar: "https://robohash.org/estitaquequia.png?size=50x50&set=set1",
    isAdmin: false,
    isVerified: true,
  },
  {
    email: "sdommerque2h@guardian.co.uk",
    password: "cI9~bY5%W",
    firstName: "Stacee",
    lastName: "Dommerque",
    birthDate: "5/29/2003",
    gender: "Female",
    avatar: "https://robohash.org/eumabamet.png?size=50x50&set=set1",
    isAdmin: false,
    isVerified: true,
  },
  {
    email: "haverill2i@cnn.com",
    password: "jX1'O@?9k&yhCr",
    firstName: "Hew",
    lastName: "Averill",
    birthDate: "11/24/2000",
    gender: "Male",
    avatar: "https://robohash.org/oditnamtempora.png?size=50x50&set=set1",
    isAdmin: false,
    isVerified: true,
  },
  {
    email: "wgossipin2j@discuz.net",
    password: "eP6%9*V|p6)u",
    firstName: "Welch",
    lastName: "Gossipin",
    birthDate: "7/11/1995",
    gender: "Male",
    avatar: "https://robohash.org/quasiipsaqui.png?size=50x50&set=set1",
    isAdmin: false,
    isVerified: true,
  },
  {
    email: "pdelacote2k@eventbrite.com",
    password: "iS1(Lvmp\\iskyq",
    firstName: "Percival",
    lastName: "De La Cote",
    birthDate: "10/11/1994",
    gender: "Male",
    avatar:
      "https://robohash.org/expeditavoluptatemeaque.png?size=50x50&set=set1",
    isAdmin: false,
    isVerified: true,
  },
  {
    email: "agrindle2l@army.mil",
    password: "nZ3'\"2unu`9<",
    firstName: "Andree",
    lastName: "Grindle",
    birthDate: "11/11/2005",
    gender: "Female",
    avatar:
      "https://robohash.org/accusantiumvoluptasconsequatur.png?size=50x50&set=set1",
    isAdmin: false,
    isVerified: true,
  },
  {
    email: "athrelkeld2m@technorati.com",
    password: "uZ8_kPQv|H}>+T",
    firstName: "Ambros",
    lastName: "Threlkeld",
    birthDate: "11/21/2003",
    gender: "Male",
    avatar: "https://robohash.org/providentoditex.png?size=50x50&set=set1",
    isAdmin: false,
    isVerified: true,
  },
  {
    email: "rlainton2n@mail.ru",
    password: "gZ7+rZN3Da\\\\<T",
    firstName: "Rosemonde",
    lastName: "Lainton",
    birthDate: "12/2/2004",
    gender: "Female",
    avatar:
      "https://robohash.org/doloradipiscilaboriosam.png?size=50x50&set=set1",
    isAdmin: false,
    isVerified: true,
  },
  {
    email: "smckimm2o@yahoo.co.jp",
    password: "tO5~VU>uB8",
    firstName: "Shannah",
    lastName: "McKimm",
    birthDate: "3/12/1991",
    gender: "Genderqueer",
    avatar: "https://robohash.org/inipsamvitae.png?size=50x50&set=set1",
    isAdmin: false,
    isVerified: true,
  },
  {
    email: "tocollopy2p@unblog.fr",
    password: "zZ8%4zeZZHmXB3.",
    firstName: "Tarrance",
    lastName: "O'Collopy",
    birthDate: "3/12/1997",
    gender: "Male",
    avatar: "https://robohash.org/quisisteut.png?size=50x50&set=set1",
    isAdmin: false,
    isVerified: true,
  },
  {
    email: "fbarrim2q@google.pl",
    password: "mJ0$<SF_'4L",
    firstName: "Farly",
    lastName: "Barrim",
    birthDate: "8/12/2003",
    gender: "Male",
    avatar: "https://robohash.org/velitquocommodi.png?size=50x50&set=set1",
    isAdmin: false,
    isVerified: true,
  },
  {
    email: "hfrostdicke2r@washington.edu",
    password: "gZ0.CQ/&{I4",
    firstName: "Ham",
    lastName: "Frostdicke",
    birthDate: "11/16/2004",
    gender: "Male",
    avatar: "https://robohash.org/quototamculpa.png?size=50x50&set=set1",
    isAdmin: false,
    isVerified: true,
  },
];

const mockProductCategories = [
  {
    name: "T-Shirts",
    description: "Short-sleeved or long-sleeved casual tops.",
    isAdmin: false,
    isVerified: true,
  },
  { name: "Shirts", description: "Formal or casual button-up shirts." },
  { name: "Pants", description: "Long trousers for men and women." },
  { name: "Jeans", description: "Denim pants suitable for casual wear." },
  {
    name: "Shorts",
    description: "Short trousers for summer or casual occasions.",
    isAdmin: false,
    isVerified: true,
  },
  { name: "Skirts", description: "Casual or formal wear for women." },
  { name: "Dresses", description: "One-piece outfits for various occasions." },
  { name: "Jackets", description: "Outerwear for warmth or style." },
  { name: "Sweaters", description: "Knitted tops for colder weather." },
  {
    name: "Hoodies",
    description: "Sweaters with hoods, great for casual wear.",
  },
  { name: "Coats", description: "Outerwear for winter or formal settings." },
  {
    name: "Blazers",
    description: "Formal jackets for professional or casual chic looks.",
  },
  {
    name: "Suits",
    description: "Matching sets of jacket and trousers for formal occasions.",
  },
  { name: "Activewear", description: "Clothes for exercise or sports." },
  {
    name: "Underwear",
    description: "Basic inner clothing like briefs and bras.",
  },
  { name: "Swimwear", description: "Clothes for swimming or beachwear." },
  { name: "Sleepwear", description: "Clothes for sleeping or lounging." },
  { name: "Accessories", description: "Hats, scarves, gloves, or belts." },
  { name: "Footwear", description: "Shoes, sandals, or boots." },
  { name: "Kidswear", description: "Clothes designed for children." },
];

const mockManufacturers = [
  {
    name: "Fashionista Co.",
    description: "Specializing in trendy casual wear for young adults.",
  },
  {
    name: "Global Trends Inc.",
    description: "Affordable and stylish streetwear manufacturer.",
  },
  {
    name: "EcoWear Ltd.",
    description: "Eco-friendly clothing made from sustainable materials.",
  },
  {
    name: "Vintage Vogue",
    description: "Luxury vintage-inspired clothing brand.",
  },
  {
    name: "Urban Streetwear",
    description: "Pioneers in urban and street fashion.",
  },
  {
    name: "Classic Comfort",
    description: "Premium classic wear focused on comfort and durability.",
  },
  {
    name: "Athleisure Pros",
    description: "Activewear blending sports and casual fashion.",
  },
  {
    name: "Denim Dreams",
    description: "Experts in high-quality denim jeans and jackets.",
  },
  {
    name: "Elegance Couture",
    description: "Sophisticated formal wear for special occasions.",
  },
  {
    name: "Youth Threads",
    description: "Casual and colorful apparel for teenagers.",
  },
  {
    name: "Bold Basics",
    description: "Minimalist designs with bold, clean cuts.",
  },
  {
    name: "Silk & Style",
    description: "Luxury silk clothing with timeless designs.",
  },
  {
    name: "Modern Nomad",
    description: "Bohemian and travel-inspired apparel brand.",
  },
  {
    name: "Cotton Comforts",
    description: "Soft and breathable cotton-based clothing.",
  },
  {
    name: "Heritage Wear",
    description: "Cultural and traditional designs with a modern twist.",
  },
  {
    name: "NextGen Fashion",
    description: "Tech-inspired futuristic clothing designs.",
  },
  {
    name: "Warm Winters",
    description: "Specialized in cozy winter wear and accessories.",
  },
  {
    name: "Spring Bloom",
    description: "Floral and pastel designs for spring and summer.",
  },
  {
    name: "Chic & Co.",
    description: "Elegant everyday wear with a chic touch.",
  },
  {
    name: "TrendWeave",
    description: "Fast fashion for the trendsetters of today.",
  },
];

const clearDatabase = async () => {
  try {
    await User.deleteMany({});
    await ProductCategory.deleteMany({});
    await Product.deleteMany({});
    await Manufacturer.deleteMany({});
    await Order.deleteMany({});
    await OrderItem.deleteMany({});
    await Cart.deleteMany({});
    await ProductStock.deleteMany({});
    await Comment.deleteMany({});

    console.log("Database cleared!");
  } catch (err) {
    console.error("Error clearing database:", err);
  }
};

const generateManufacturer = async (mockManufacturer) => {
  await Manufacturer.insertMany(mockManufacturer);
};

const generateUser = async (mockUser) => {
  try {
    const usersWithHashedPasswords = await Promise.all(
      mockUser.map(async (user) => ({
        ...user,
        password: await bcrypt.hash(user.password, 10),
      }))
    );

    await User.insertMany(usersWithHashedPasswords);
    console.log("Users added successfully with hashed passwords!");
  } catch (err) {
    console.error("Error adding users:", err);
  }
};

const generateProductCategories = async (mockProductCategories) => {
  await ProductCategory.insertMany(mockProductCategories);
  console.log("Product Categories added successfully");
};

const generateProduct = async () => {
  try {
    const productCategories = await ProductCategory.find({});
    const manufacturers = await Manufacturer.find({});
    const obj = {};
    productCategories.map((productCategory) => {
      obj[productCategory.name] = productCategory._id.toString();
    });
    const mockProduct = [
      {
        name: "Classic White Tee",
        description: "A versatile white t-shirt made from 100% cotton.",
        price: 19.9,
        categories: [new mongoose.Types.ObjectId(obj['"T-Shirts"'])],
        mainImage:
          "https://image.uniqlo.com/UQ/ST3/vn/imagesgoods/465187/item/vngoods_00_465187_3x4.jpg?width=423",
        colors: [
          {
            color_name: colors.white,
            images: [
              "https://image.uniqlo.com/UQ/ST3/vn/imagesgoods/465187/item/vngoods_00_465187_3x4.jpg?width=369",
            ],
          },
          {
            color_name: colors.black,
            images: [
              "https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/465187/item/goods_09_465187_3x4.jpg?width=369",
            ],
          },
          {
            color_name: colors.brown,
            images: [
              "https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/465187/item/goods_34_465187_3x4.jpg?width=369",
            ],
          },
          {
            color_name: colors.wine,
            images: [
              "https://image.uniqlo.com/UQ/ST3/vn/imagesgoods/465187/item/vngoods_18_465187_3x4.jpg?width=369",
            ],
          },
          {
            color_name: colors.yellow,
            images: [
              "https://image.uniqlo.com/UQ/ST3/vn/imagesgoods/465187/item/vngoods_42_465187_3x4.jpg?width=369",
            ],
          },
          {
            color_name: colors.green,
            images: [
              "https://image.uniqlo.com/UQ/ST3/vn/imagesgoods/465187/item/vngoods_55_465187_3x4.jpg?width=369",
            ],
          },
          {
            color_name: colors.darkGreen,
            images: [
              "https://image.uniqlo.com/UQ/ST3/vn/imagesgoods/465187/item/vngoods_59_465187_3x4.jpg?width=369",
            ],
          },
          {
            color_name: colors.royalBlue,
            images: [
              "https://image.uniqlo.com/UQ/ST3/us/imagesgoods/465185/item/usgoods_67_465185_3x4.jpg?width=400 ",
            ],
          },
          {
            color_name: colors.navyBlue,
            images: [
              "https://image.uniqlo.com/UQ/ST3/vn/imagesgoods/465187/item/vngoods_69_465187_3x4.jpg?width=369",
            ],
          },
        ],
        type: productType.TOP_WEAR,
        size: [
          shirtSizes.XS,
          shirtSizes.S,
          shirtSizes.M,
          shirtSizes.L,
          shirtSizes.XL,
        ],
      },
      {
        name: "Ultra Light Down Jacket",
        description: "A lightweight and warm jacket for cold weather.",
        price: 69.9,
        categories: [new mongoose.Types.ObjectId(obj['"Jackets"'])],
        mainImage:
          "https://image.uniqlo.com/UQ/ST3/us/imagesgoods/470067/item/usgoods_69_470067_3x4.jpg?width=600",
        colors: [
          {
            color_name: colors.black,
            images: [
              "https://image.uniqlo.com/UQ/ST3/us/imagesgoods/470067/item/usgoods_09_470067_3x4.jpg?width=600",
            ],
          },
          {
            color_name: colors.wine,
            images: [
              "https://image.uniqlo.com/UQ/ST3/us/imagesgoods/470067/item/usgoods_19_470067_3x4.jpg?width=600",
            ],
          },
          {
            color_name: colors.beige,
            images: [
              "https://image.uniqlo.com/UQ/ST3/us/imagesgoods/470067/item/usgoods_32_470067_3x4.jpg?width=600",
            ],
          },
          {
            color_name: colors.olive,
            images: [
              "https://image.uniqlo.com/UQ/ST3/us/imagesgoods/470067/item/usgoods_57_470067_3x4.jpg?width=600",
            ],
          },
          {
            color_name: colors.navyBlue,
            images: [
              "https://image.uniqlo.com/UQ/ST3/us/imagesgoods/470067/item/usgoods_69_470067_3x4.jpg?width=600",
            ],
          },
        ],
        type: productType.TOP_WEAR,
        size: [
          shirtSizes.XS,
          shirtSizes.S,
          shirtSizes.M,
          shirtSizes.L,
          shirtSizes.XL,
        ],
      },
      {
        name: "ARCANE LEAGUE OF LEGENDS UT Graphic T-Shirt",
        price: 24.9,
        mainImage:
          "https://image.uniqlo.com/UQ/ST3/us/imagesgoods/477148/item/usgoods_00_477148_3x4.jpg",
        colors: [
          {
            color_name: colors.white,
            images: [
              "https://image.uniqlo.com/UQ/ST3/us/imagesgoods/477148/item/usgoods_00_477148_3x4.jpg",
            ],
          },
        ],
        size: [
          shirtSizes.XXS,
          shirtSizes.XS,
          shirtSizes.S,
          shirtSizes.M,
          shirtSizes.L,
          shirtSizes.XL,
          shirtSizes.XXL,
          shirtSizes.XXXL,
        ],
        categories: [new mongoose.Types.ObjectId(obj['"T-Shirts"'])],
        type: productType.TOP_WEAR,
      },
      {
        name: "ARCANE LEAGUE OF LEGENDS UT Graphic T-Shirt",
        price: 24.9,
        mainImage:
          "https://image.uniqlo.com/UQ/ST3/us/imagesgoods/477147/item/usgoods_59_477147_3x4.jpg",
        colors: [
          {
            color_name: colors.darkGreen,
            images: [
              "https://image.uniqlo.com/UQ/ST3/us/imagesgoods/477147/item/usgoods_59_477147_3x4.jpg",
            ],
          },
        ],
        size: [
          shirtSizes.XXS,
          shirtSizes.XS,
          shirtSizes.S,
          shirtSizes.M,
          shirtSizes.L,
          shirtSizes.XL,
          shirtSizes.XXL,
          shirtSizes.XXXL,
        ],
        categories: [new mongoose.Types.ObjectId(obj['"T-Shirts"'])],
        type: productType.TOP_WEAR,
      },
      {
        name: "ARCANE LEAGUE OF LEGENDS UT Graphic T-Shirt",
        price: 24.9,
        mainImage:
          "https://image.uniqlo.com/UQ/ST3/us/imagesgoods/477146/item/usgoods_08_477146_3x4.jpg",
        colors: [
          {
            color_name: colors.darkGray,
            images: [
              "https://image.uniqlo.com/UQ/ST3/us/imagesgoods/477146/item/usgoods_08_477146_3x4.jpg",
            ],
          },
        ],
        size: [shirtSizes.XXS, shirtSizes.XXL, shirtSizes.XXXL],
        categories: [new mongoose.Types.ObjectId(obj['"T-Shirts"'])],
        type: productType.TOP_WEAR,
      },
      {
        name: "Round Mini Shoulder Bag | Striped",
        price: 19.9,
        mainImage:
          "https://image.uniqlo.com/UQ/ST3/WesternCommon/imagesgoods/477115/item/goods_15_477115_3x4.jpg",
        colors: [
          {
            color_name: colors.red,
            images: [
              "https://image.uniqlo.com/UQ/ST3/WesternCommon/imagesgoods/477115/item/goods_15_477115_3x4.jpg",
            ],
          },
          {
            color_name: colors.navyBlue,
            images: [
              "https://image.uniqlo.com/UQ/ST3/WesternCommon/imagesgoods/477115/item/goods_69_477115_3x4.jpg",
            ],
          },
        ],
        size: [],
        categories: [new mongoose.Types.ObjectId(obj['"Accessories"'])],
        type: productType.ACCESSORIES,
      },
      {
        name: "Unsodo Open Collar Shirt | Short Sleeve | Printed",
        price: 39.9,
        mainImage:
          "https://image.uniqlo.com/UQ/ST3/us/imagesgoods/477091/item/usgoods_00_477091_3x4.jpg",
        colors: [
          {
            color_name: colors.white,
            images: [
              "https://image.uniqlo.com/UQ/ST3/us/imagesgoods/477091/item/usgoods_00_477091_3x4.jpg",
            ],
          },
        ],
        size: [
          shirtSizes.XXS,
          shirtSizes.XS,
          shirtSizes.S,
          shirtSizes.M,
          shirtSizes.L,
          shirtSizes.XL,
          shirtSizes.XXL,
        ],
        categories: [new mongoose.Types.ObjectId(obj['"Shirts"'])],
        type: productType.TOP_WEAR,
      },
      {
        name: "Unsodo Open Collar Shirt | Short Sleeve | Printed",
        price: 39.9,
        mainImage:
          "https://image.uniqlo.com/UQ/ST3/us/imagesgoods/477090/item/usgoods_66_477090_3x4.jpg",
        colors: [
          {
            color_name: colors.blue,
            images: [
              "https://image.uniqlo.com/UQ/ST3/us/imagesgoods/477090/item/usgoods_66_477090_3x4.jpg",
            ],
          },
        ],
        size: [
          shirtSizes.XXS,
          shirtSizes.XS,
          shirtSizes.S,
          shirtSizes.M,
          shirtSizes.L,
          shirtSizes.XL,
          shirtSizes.XXL,
        ],
        categories: [new mongoose.Types.ObjectId(obj['"Shirts"'])],
        type: productType.TOP_WEAR,
      },
      {
        name: "The SAKE Collection UT Graphic T-Shirt",
        price: 19.9,
        mainImage:
          "https://image.uniqlo.com/UQ/ST3/us/imagesgoods/477043/item/usgoods_09_477043_3x4.jpg",
        colors: [
          {
            color_name: colors.black,
            images: [
              "https://image.uniqlo.com/UQ/ST3/us/imagesgoods/477043/item/usgoods_09_477043_3x4.jpg",
            ],
          },
        ],
        size: [
          shirtSizes.XXS,
          shirtSizes.XS,
          shirtSizes.S,
          shirtSizes.M,
          shirtSizes.L,
          shirtSizes.XL,
          shirtSizes.XXL,
          shirtSizes.XXXL,
        ],
        categories: [new mongoose.Types.ObjectId(obj['"T-Shirts"'])],
        type: productType.TOP_WEAR,
      },
      {
        name: "The SAKE Collection UT Graphic T-Shirt",
        price: 19.9,
        mainImage:
          "https://image.uniqlo.com/UQ/ST3/us/imagesgoods/477042/item/usgoods_01_477042_3x4.jpg",
        colors: [
          {
            color_name: colors.white,
            images: [
              "https://image.uniqlo.com/UQ/ST3/us/imagesgoods/477042/item/usgoods_01_477042_3x4.jpg",
            ],
          },
        ],
        size: [
          shirtSizes.XXS,
          shirtSizes.XS,
          shirtSizes.S,
          shirtSizes.M,
          shirtSizes.L,
          shirtSizes.XL,
          shirtSizes.XXL,
          shirtSizes.XXXL,
        ],
        categories: [new mongoose.Types.ObjectId(obj['"T-Shirts"'])],
        type: productType.TOP_WEAR,
      },
      {
        name: "Italian Leather Slide Buckle Belt",
        price: 29.9,
        mainImage:
          "https://image.uniqlo.com/UQ/ST3/WesternCommon/imagesgoods/476854/item/goods_37_476854_3x4.jpg",
        colors: [
          {
            color_name: colors.black,
            images: [
              "https://image.uniqlo.com/UQ/ST3/WesternCommon/imagesgoods/476854/item/goods_09_476854_3x4.jpg",
            ],
          },
          {
            color_name: colors.brown,
            images: [
              "https://image.uniqlo.com/UQ/ST3/WesternCommon/imagesgoods/476854/item/goods_37_476854_3x4.jpg",
            ],
          },
        ],
        size: [shirtSizes.M, shirtSizes.L, shirtSizes.XL],
        categories: [new mongoose.Types.ObjectId(obj['"Accessories"'])],
        type: productType.ACCESSORIES,
      },
      {
        name: "Italian Leather Garrison Belt",
        price: 29.9,
        mainImage:
          "https://image.uniqlo.com/UQ/ST3/WesternCommon/imagesgoods/476853/item/goods_37_476853_3x4.jpg",
        colors: [
          {
            color_name: colors.black,
            images: [
              "https://image.uniqlo.com/UQ/ST3/WesternCommon/imagesgoods/476853/item/goods_09_476853_3x4.jpg",
            ],
          },
          {
            color_name: colors.brown,
            images: [
              "https://image.uniqlo.com/UQ/ST3/WesternCommon/imagesgoods/476853/item/goods_37_476853_3x4.jpg",
            ],
          },
        ],
        size: [shirtSizes.M, shirtSizes.L, shirtSizes.XL],
        categories: [new mongoose.Types.ObjectId(obj['"Accessories"'])],
        type: productType.ACCESSORIES,
      },
      {
        name: "Seamless Down Parka",
        price: 129.9,
        mainImage:
          "https://image.uniqlo.com/UQ/ST3/us/imagesgoods/469896/item/usgoods_31_469896_3x4.jpg",
        colors: [
          {
            color_name: colors.beige,
            images: [
              "https://image.uniqlo.com/UQ/ST3/us/imagesgoods/469896/item/usgoods_31_469896_3x4.jpg",
            ],
          },
          {
            color_name: colors.white,
            images: [
              "https://image.uniqlo.com/UQ/ST3/us/imagesgoods/469896/item/usgoods_01_469896_3x4.jpg",
            ],
          },
          {
            color_name: colors.grey,
            images: [
              "https://image.uniqlo.com/UQ/ST3/us/imagesgoods/469896/item/usgoods_07_469896_3x4.jpg",
            ],
          },
          {
            color_name: colors.black,
            images: [
              "https://image.uniqlo.com/UQ/ST3/us/imagesgoods/469896/item/usgoods_09_469896_3x4.jpg",
            ],
          },
          {
            color_name: colors.blue,
            images: [
              "https://image.uniqlo.com/UQ/ST3/us/imagesgoods/469896/item/usgoods_67_469896_3x4.jpg",
            ],
          },
          {
            color_name: colors.darkGreen,
            images: [
              "https://image.uniqlo.com/UQ/ST3/us/imagesgoods/469896/item/usgoods_58_469896_3x4.jpg",
            ],
          },
        ],
        size: [shirtSizes.M, shirtSizes.L, shirtSizes.XL],
        categories: [new mongoose.Types.ObjectId(obj['"Jackets"'])],
        type: productType.TOP_WEAR,
      },
      {
        name: "Powder Soft Down Jacket",
        price: 79.9,
        mainImage:
          "https://image.uniqlo.com/UQ/ST3/us/imagesgoods/469901/item/usgoods_56_469901_3x4.jpg",
        colors: [
          {
            color_name: colors.white,
            images: [
              "https://image.uniqlo.com/UQ/ST3/us/imagesgoods/469901/item/usgoods_01_469901_3x4.jpg",
            ],
          },
          {
            color_name: colors.grey,
            images: [
              "https://image.uniqlo.com/UQ/ST3/us/imagesgoods/469901/item/usgoods_07_469901_3x4.jpg",
            ],
          },
          {
            color_name: colors.black,
            images: [
              "https://image.uniqlo.com/UQ/ST3/us/imagesgoods/469901/item/usgoods_09_469901_3x4.jpg",
            ],
          },
          {
            color_name: colors.olive,
            images: [
              "https://image.uniqlo.com/UQ/ST3/us/imagesgoods/469901/item/usgoods_56_469901_3x4.jpg",
            ],
          },
        ],
        size: ["XXS", "XS", "S", "M", "L", "XL", "XXL"],
        categories: [new mongoose.Types.ObjectId(obj['"Jackets"'])],
        type: productType.TOP_WEAR,
      },
      {
        name: "Hybrid Down Coat",
        price: 129.9,
        mainImage:
          "https://image.uniqlo.com/UQ/ST3/us/imagesgoods/469899/item/usgoods_30_469899_3x4.jpg",
        colors: [
          {
            color_name: colors.black,
            images: [
              "https://image.uniqlo.com/UQ/ST3/us/imagesgoods/469899/item/usgoods_09_469899_3x4.jpg",
            ],
          },
          {
            color_name: colors.natural,
            images: [
              "https://image.uniqlo.com/UQ/ST3/us/imagesgoods/469899/item/usgoods_30_469899_3x4.jpg",
            ],
          },
          {
            color_name: colors.beige,
            images: [
              "https://image.uniqlo.com/UQ/ST3/us/imagesgoods/469899/item/usgoods_32_469899_3x4.jpg",
            ],
          },
        ],
        size: ["XXS", "XS", "S", "M", "L", "XL", "XXL"],
        categories: [new mongoose.Types.ObjectId(obj['"Coats"'])],
        type: productType.TOP_WEAR,
      },
      {
        name: "Ultra Light Down Parka | 2023 Edition",
        price: 69.9,
        mainImage:
          "https://image.uniqlo.com/UQ/ST3/WesternCommon/imagesgoods/450311/item/goods_12_450311_3x4.jpg",
        colors: [
          {
            color_name: colors.white,
            images: [
              "https://image.uniqlo.com/UQ/ST3/WesternCommon/imagesgoods/450311/item/goods_01_450311_3x4.jpg",
            ],
          },
          {
            color_name: colors.black,
            images: [
              "https://image.uniqlo.com/UQ/ST3/us/imagesgoods/450311/item/usgoods_09_450311_3x4.jpg",
            ],
          },
          {
            color_name: colors.navyBlue,
            images: [
              "https://image.uniqlo.com/UQ/ST3/us/imagesgoods/450311/item/usgoods_69_450311_3x4.jpg",
            ],
          },
        ],
        size: ["XXS", "XS", "S", "M", "L", "XL"],
        categories: [new mongoose.Types.ObjectId(obj['"Jackets"'])],
        type: productType.TOP_WEAR,
      },
      {
        name: "Ultra Light Down Long Coat",
        price: 129.9,
        mainImage:
          "https://image.uniqlo.com/UQ/ST3/us/imagesgoods/469872/item/usgoods_31_469872_3x4.jpg",
        colors: [
          {
            color_name: colors.darkGray,
            images: [
              "https://image.uniqlo.com/UQ/ST3/us/imagesgoods/469872/item/usgoods_08_469872_3x4.jpg",
            ],
          },
          {
            color_name: colors.black,
            images: [
              "https://image.uniqlo.com/UQ/ST3/us/imagesgoods/469872/item/usgoods_09_469872_3x4.jpg",
            ],
          },
          {
            color_name: colors.beige,
            images: [
              "https://image.uniqlo.com/UQ/ST3/us/imagesgoods/469872/item/usgoods_31_469872_3x4.jpg",
            ],
          },
        ],
        size: ["XXS", "XS", "S", "M", "L", "XL", "XXL"],
        categories: [new mongoose.Types.ObjectId(obj['"Coats"'])],
        type: productType.TOP_WEAR,
      },
      {
        name: "Ultra Light Down Parka",
        price: 69.9,
        mainImage:
          "https://image.uniqlo.com/UQ/ST3/us/imagesgoods/473413/item/usgoods_69_473413_3x4.jpg",
        colors: [
          {
            color_name: colors.white,
            images: [
              "https://image.uniqlo.com/UQ/ST3/us/imagesgoods/473413/item/usgoods_00_473413_3x4.jpg",
            ],
          },
          {
            color_name: colors.grey,
            images: [
              "https://image.uniqlo.com/UQ/ST3/us/imagesgoods/473413/item/usgoods_04_473413_3x4.jpg",
            ],
          },
        ],
        size: ["XXS", "XS", "S", "M", "L", "XL", "XXL"],
        categories: [new mongoose.Types.ObjectId(obj['"Jackets"'])],
        type: productType.TOP_WEAR,
      },
      {
        name: "PUFFTECH Parka",
        price: 79.9,
        mainImage:
          "https://image.uniqlo.com/UQ/ST3/us/imagesgoods/469871/item/usgoods_30_469871_3x4.jpg",
        colors: [
          {
            color_name: colors.darkGray,
            images: [
              "https://image.uniqlo.com/UQ/ST3/us/imagesgoods/469871/item/usgoods_08_469871_3x4.jpg",
            ],
          },
          {
            color_name: colors.black,
            images: [
              "https://image.uniqlo.com/UQ/ST3/us/imagesgoods/469871/item/usgoods_09_469871_3x4.jpg",
            ],
          },
          {
            color_name: colors.natural,
            images: [
              "https://image.uniqlo.com/UQ/ST3/us/imagesgoods/469871/item/usgoods_30_469871_3x4.jpg",
            ],
          },
          {
            color_name: colors.purple,
            images: [
              "https://image.uniqlo.com/UQ/ST3/us/imagesgoods/469871/item/usgoods_72_469871_3x4.jpg",
            ],
          },
        ],
        size: ["XXS", "XS", "S", "M", "L", "XL", "XXL"],
        categories: [new mongoose.Types.ObjectId(obj['"Jackets"'])],
        type: productType.TOP_WEAR,
      },
      {
        name: "Down Belted Long Coat",
        price: 59.9,
        mainImage:
          "https://image.uniqlo.com/UQ/ST3/us/imagesgoods/469873/item/usgoods_32_469873_3x4.jpg",
        colors: [
          {
            color_name: colors.black,
            images: [
              "https://image.uniqlo.com/UQ/ST3/WesternCommon/imagesgoods/469873/item/goods_09_469873_3x4.jpg",
            ],
          },
          {
            color_name: colors.beige,
            images: [
              "https://image.uniqlo.com/UQ/ST3/us/imagesgoods/469873/item/usgoods_32_469873_3x4.jpg",
            ],
          },
          {
            color_name: colors.navyBlue,
            images: [
              "https://image.uniqlo.com/UQ/ST3/us/imagesgoods/469873/item/usgoods_69_469873_3x4.jpg",
            ],
          },
        ],
        size: ["XXS", "XS", "S", "M", "L", "XL"],
        categories: [new mongoose.Types.ObjectId(obj['"Coats"'])],
        type: productType.TOP_WEAR,
      },
      {
        name: "PUFFTECH Non-Quilted Coat",
        price: 59.9,
        mainImage:
          "https://image.uniqlo.com/UQ/ST3/us/imagesgoods/471545/item/usgoods_38_471545_3x4.jpg",
        colors: [
          {
            color_name: colors.darkGray,
            images: [
              "https://image.uniqlo.com/UQ/ST3/us/imagesgoods/471545/item/usgoods_08_471545_3x4.jpg",
            ],
          },
          {
            color_name: colors.green,
            images: [
              "https://image.uniqlo.com/UQ/ST3/us/imagesgoods/471545/item/usgoods_54_471545_3x4.jpg",
            ],
          },
        ],
        size: ["XXS", "XS", "S", "M"],
        categories: [new mongoose.Types.ObjectId(obj['"Coats"'])],
        type: productType.TOP_WEAR,
      },
      {
        name: "Ultra Light Down Jacket",
        price: 79.9,
        mainImage:
          "https://image.uniqlo.com/UQ/ST3/us/imagesgoods/469869/item/usgoods_11_469869_3x4.jpg",
        colors: [
          {
            color_name: colors.white,
            images: [
              "https://image.uniqlo.com/UQ/ST3/us/imagesgoods/469869/item/usgoods_01_469869_3x4.jpg",
            ],
          },
          {
            color_name: colors.grey,
            images: [
              "https://image.uniqlo.com/UQ/ST3/us/imagesgoods/469869/item/usgoods_04_469869_3x4.jpg",
            ],
          },
          {
            color_name: colors.black,
            images: [
              "https://image.uniqlo.com/UQ/ST3/us/imagesgoods/469869/item/usgoods_09_469869_3x4.jpg",
            ],
          },
          {
            color_name: colors.pink,
            images: [
              "https://image.uniqlo.com/UQ/ST3/us/imagesgoods/469869/item/usgoods_12_469869_3x4.jpg",
            ],
          },
          {
            color_name: colors.wine,
            images: [
              "https://image.uniqlo.com/UQ/ST3/us/imagesgoods/469869/item/usgoods_19_469869_3x4.jpg",
            ],
          },
          {
            color_name: colors.beige,
            images: [
              "https://image.uniqlo.com/UQ/ST3/us/imagesgoods/469869/item/usgoods_32_469869_3x4.jpg",
            ],
          },
          {
            color_name: colors.green,
            images: [
              "https://image.uniqlo.com/UQ/ST3/us/imagesgoods/469869/item/usgoods_52_469869_3x4.jpg",
            ],
          },
          {
            color_name: colors.darkGreen,
            images: [
              "https://image.uniqlo.com/UQ/ST3/us/imagesgoods/469869/item/usgoods_59_469869_3x4.jpg",
            ],
          },
          {
            color_name: colors.navyBlue,
            images: [
              "https://image.uniqlo.com/UQ/ST3/us/imagesgoods/469869/item/usgoods_69_469869_3x4.jpg",
            ],
          },
        ],
        size: ["XXS", "XS", "S", "M", "L", "XL", "XXL"],
        categories: [new mongoose.Types.ObjectId(obj['"Jackets"'])],
        type: productType.TOP_WEAR,
      },
      {
        name: "BLOCKTECH Half Coat",
        price: 59.9,
        mainImage:
          "https://image.uniqlo.com/UQ/ST3/us/imagesgoods/469912/item/usgoods_30_469912_3x4.jpg",
        colors: [
          {
            color_name: colors.white,
            images: [
              "https://image.uniqlo.com/UQ/ST3/us/imagesgoods/469912/item/usgoods_01_469912_3x4.jpg",
            ],
          },
          {
            color_name: colors.black,
            images: [
              "https://image.uniqlo.com/UQ/ST3/us/imagesgoods/469912/item/usgoods_09_469912_3x4.jpg",
            ],
          },
          {
            color_name: colors.natural,
            images: [
              "https://image.uniqlo.com/UQ/ST3/us/imagesgoods/469912/item/usgoods_30_469912_3x4.jpg",
            ],
          },
          {
            color_name: colors.olive,
            images: [
              "https://image.uniqlo.com/UQ/ST3/us/imagesgoods/469912/item/usgoods_57_469912_3x4.jpg",
            ],
          },
          {
            color_name: colors.navyBlue,
            images: [
              "https://image.uniqlo.com/UQ/ST3/us/imagesgoods/469912/item/usgoods_69_469912_3x4.jpg",
            ],
          },
        ],
        size: ["XXS", "XS", "S", "M", "L", "XL", "XXL"],
        categories: [new mongoose.Types.ObjectId(obj['"Coats"'])],
        type: productType.TOP_WEAR,
      },
      {
        name: "PUFFTECH Relaxed Jacket | Quilted",
        price: 39.9,
        mainImage:
          "https://image.uniqlo.com/UQ/ST3/us/imagesgoods/469864/item/usgoods_30_469864_3x4.jpg",
        colors: [
          {
            color_name: colors.black,
            images: [
              "https://image.uniqlo.com/UQ/ST3/us/imagesgoods/469864/item/usgoods_09_469864_3x4.jpg",
            ],
          },
          {
            color_name: colors.natural,
            images: [
              "https://image.uniqlo.com/UQ/ST3/us/imagesgoods/469864/item/usgoods_30_469864_3x4.jpg",
            ],
          },
          {
            color_name: colors.beige,
            images: [
              "https://image.uniqlo.com/UQ/ST3/us/imagesgoods/469864/item/usgoods_32_469864_3x4.jpg",
            ],
          },
          {
            color_name: colors.olive,
            images: [
              "https://image.uniqlo.com/UQ/ST3/us/imagesgoods/469864/item/usgoods_57_469864_3x4.jpg",
            ],
          },
        ],
        size: ["XS", "S", "M", "L", "XL"],
        categories: [new mongoose.Types.ObjectId(obj['"Jackets"'])],
        type: productType.TOP_WEAR,
      },
      {
        name: "Ultra Light Down Vest",
        price: 39.9,
        mainImage:
          "https://image.uniqlo.com/UQ/ST3/us/imagesgoods/469870/item/usgoods_31_469870_3x4.jpg",
        colors: [
          {
            color_name: colors.white,
            images: [
              "https://image.uniqlo.com/UQ/ST3/us/imagesgoods/469870/item/usgoods_01_469870_3x4.jpg",
            ],
          },
          {
            color_name: colors.grey,
            images: [
              "https://image.uniqlo.com/UQ/ST3/us/imagesgoods/469870/item/usgoods_04_469870_3x4.jpg",
            ],
          },
          {
            color_name: colors.black,
            images: [
              "https://image.uniqlo.com/UQ/ST3/us/imagesgoods/469870/item/usgoods_09_469870_3x4.jpg",
            ],
          },
          {
            color_name: colors.beige,
            images: [
              "https://image.uniqlo.com/UQ/ST3/us/imagesgoods/469870/item/usgoods_31_469870_3x4.jpg",
            ],
          },
          {
            color_name: colors.brown,
            images: [
              "https://image.uniqlo.com/UQ/ST3/WesternCommon/imagesgoods/469870/item/goods_34_469870_3x4.jpg",
            ],
          },
          {
            color_name: colors.skyBlue,
            images: [
              "https://image.uniqlo.com/UQ/ST3/us/imagesgoods/469870/item/usgoods_60_469870_3x4.jpg",
            ],
          },
        ],
        size: ["XXS", "XS", "S", "M", "L", "XL", "XXL"],
        categories: [new mongoose.Types.ObjectId(obj['"Blazers"'])],
        type: productType.TOP_WEAR,
      },
      {
        name: "HEATTECH Pile Lined Sweatpants",
        price: 39.9,
        mainImage:
          "https://image.uniqlo.com/UQ/ST3/us/imagesgoods/459792/item/usgoods_12_459792_3x4.jpg",
        colors: [
          {
            color_name: colors.white,
            images: [
              "https://image.uniqlo.com/UQ/ST3/us/imagesgoods/459792/item/usgoods_01_459792_3x4.jpg",
            ],
          },
          {
            color_name: colors.grey,
            images: [
              "https://image.uniqlo.com/UQ/ST3/us/imagesgoods/459792/item/usgoods_03_459792_3x4.jpg",
            ],
          },
          {
            color_name: colors.black,
            images: [
              "https://image.uniqlo.com/UQ/ST3/us/imagesgoods/459792/item/usgoods_09_459792_3x4.jpg",
            ],
          },
          {
            color_name: colors.pink,
            images: [
              "https://image.uniqlo.com/UQ/ST3/us/imagesgoods/459792/item/usgoods_12_459792_3x4.jpg",
            ],
          },
          {
            color_name: colors.navyBlue,
            images: [
              "https://image.uniqlo.com/UQ/ST3/us/imagesgoods/459792/item/usgoods_69_459792_3x4.jpg",
            ],
          },
        ],
        size: [
          pantSizes[28],
          pantSizes[30],
          pantSizes[32],
          pantSizes[34],
          pantSizes[36],
          pantSizes[38],
          pantSizes[40],
          pantSizes[42],
          pantSizes[44],
        ],
        categories: [new mongoose.Types.ObjectId(obj['"Pants"'])],
        type: productType.BOTTOM_WEAR,
      },
      {
        name: "Single Collar Tweed Coat",
        price: 59.9,
        mainImage:
          "https://image.uniqlo.com/UQ/ST3/us/imagesgoods/469907/item/usgoods_32_469907_3x4.jpg",
        colors: [
          {
            color_name: colors.darkGray,
            images: [
              "https://image.uniqlo.com/UQ/ST3/us/imagesgoods/469907/item/usgoods_08_469907_3x4.jpg",
            ],
          },
          {
            color_name: colors.beige,
            images: [
              "https://image.uniqlo.com/UQ/ST3/us/imagesgoods/469907/item/usgoods_32_469907_3x4.jpg",
            ],
          },
        ],
        size: [
          pantSizes[28],
          pantSizes[30],
          pantSizes[32],
          pantSizes[34],
          pantSizes[36],
          pantSizes[38],
          pantSizes[40],
          pantSizes[42],
          pantSizes[44],
        ],
        categories: [new mongoose.Types.ObjectId(obj['"Pants"'])],
        type: productType.BOTTOM_WEAR,
      },
      {
        name: "PUFFTECH Compact Jacket",
        price: 69.9,
        mainImage:
          "https://image.uniqlo.com/UQ/ST3/us/imagesgoods/469862/item/usgoods_12_469862_3x4.jpg",
        colors: [
          {
            color_name: colors.white,
            images: [
              "https://image.uniqlo.com/UQ/ST3/us/imagesgoods/469862/item/usgoods_01_469862_3x4.jpg",
            ],
          },
          {
            color_name: colors.black,
            images: [
              "https://image.uniqlo.com/UQ/ST3/us/imagesgoods/469862/item/usgoods_09_469862_3x4.jpg",
            ],
          },
          {
            color_name: colors.beige,
            images: [
              "https://image.uniqlo.com/UQ/ST3/us/imagesgoods/469862/item/usgoods_32_469862_3x4.jpg",
            ],
          },
          {
            color_name: colors.olive,
            images: [
              "https://image.uniqlo.com/UQ/ST3/us/imagesgoods/469862/item/usgoods_56_469862_3x4.jpg",
            ],
          },
        ],
        size: ["XS", "S", "M", "L", "XL", "XXL"],
        categories: [new mongoose.Types.ObjectId(obj['"Jackets"'])],
        type: productType.TOP_WEAR,
      },
      {
        name: "Double Face Chester Long Coat",
        price: 99.9,
        mainImage:
          "https://image.uniqlo.com/UQ/ST3/us/imagesgoods/469906/item/usgoods_30_469906_3x4.jpg",
        colors: [
          {
            color_name: colors.grey,
            images: [
              "https://image.uniqlo.com/UQ/ST3/us/imagesgoods/469906/item/usgoods_06_469906_3x4.jpg",
            ],
          },
          {
            color_name: colors.black,
            images: [
              "https://image.uniqlo.com/UQ/ST3/us/imagesgoods/469906/item/usgoods_09_469906_3x4.jpg",
            ],
          },
          {
            color_name: colors.natural,
            images: [
              "https://image.uniqlo.com/UQ/ST3/us/imagesgoods/469906/item/usgoods_30_469906_3x4.jpg",
            ],
          },
        ],
        size: ["XS", "M", "L", "XL", "XXL"],
        categories: [new mongoose.Types.ObjectId(obj['"Jackets"'])],
        type: productType.TOP_WEAR,
      },
      {
        name: "HEATTECH Knitted Gloves",
        price: 14.9,
        mainImage:
          "https://image.uniqlo.com/UQ/ST3/WesternCommon/imagesgoods/459738/item/goods_16_459738_3x4.jpg",
        colors: [
          {
            color_name: colors.darkGray,
            images: [
              "https://image.uniqlo.com/UQ/ST3/WesternCommon/imagesgoods/459738/item/goods_08_459738_3x4.jpg",
            ],
          },
          {
            color_name: colors.black,
            images: [
              "https://image.uniqlo.com/UQ/ST3/WesternCommon/imagesgoods/459738/item/goods_09_459738_3x4.jpg",
            ],
          },
          {
            color_name: colors.beige,
            images: [
              "https://image.uniqlo.com/UQ/ST3/WesternCommon/imagesgoods/459738/item/goods_31_459738_3x4.jpg",
            ],
          },
          {
            color_name: colors.olive,
            images: [
              "https://image.uniqlo.com/UQ/ST3/WesternCommon/imagesgoods/459738/item/goods_57_459738_3x4.jpg",
            ],
          },
          {
            color_name: colors.blue,
            images: [
              "https://image.uniqlo.com/UQ/ST3/WesternCommon/imagesgoods/459738/item/goods_65_459738_3x4.jpg",
            ],
          },
        ],
        size: ["M", "L"],
        categories: [new mongoose.Types.ObjectId(obj['"Accessories"'])],
        type: productType.ACCESSORIES,
      },
      {
        name: "Coating Long Coat",
        price: 49.9,
        mainImage:
          "https://image.uniqlo.com/UQ/ST3/us/imagesgoods/471544/item/usgoods_31_471544_3x4.jpg",
        colors: [
          {
            color_name: colors.beige,
            images: [
              "https://image.uniqlo.com/UQ/ST3/us/imagesgoods/471544/item/usgoods_31_471544_3x4.jpg",
            ],
          },
          {
            color_name: colors.brown,
            images: [
              "https://image.uniqlo.com/UQ/ST3/us/imagesgoods/471544/item/usgoods_38_471544_3x4.jpg",
            ],
          },
        ],
        size: ["S", "M", "L", "XL"],
        categories: [new mongoose.Types.ObjectId(obj['"Jackets"'])],
        type: productType.TOP_WEAR,
      },
      {
        name: "HEATTECH Scarf",
        price: 19.9,
        mainImage:
          "https://image.uniqlo.com/UQ/ST3/WesternCommon/imagesgoods/470021/item/goods_32_470021_3x4.jpg",
        colors: [
          {
            color_name: colors.white,
            images: [
              "https://image.uniqlo.com/UQ/ST3/WesternCommon/imagesgoods/470021/item/goods_01_470021_3x4.jpg",
            ],
          },
          {
            color_name: colors.grey,
            images: [
              "https://image.uniqlo.com/UQ/ST3/WesternCommon/imagesgoods/470021/item/goods_07_470021_3x4.jpg",
            ],
          },
          {
            color_name: colors.black,
            images: [
              "https://image.uniqlo.com/UQ/ST3/WesternCommon/imagesgoods/470021/item/goods_09_470021_3x4.jpg",
            ],
          },
        ],
        size: ["One Size"],
        categories: [new mongoose.Types.ObjectId(obj['"Accessories"'])],
        type: productType.ACCESSORIES,
      },
      {
        name: "HEATTECH Easy Pants",
        price: 49.9,
        mainImage:
          "https://image.uniqlo.com/UQ/ST3/us/imagesgoods/469903/item/usgoods_57_469903_3x4.jpg",
        colors: [
          {
            color_name: colors.grey,
            images: [
              "https://image.uniqlo.com/UQ/ST3/us/imagesgoods/469903/item/usgoods_07_469903_3x4.jpg",
            ],
          },
          {
            color_name: colors.black,
            images: [
              "https://image.uniqlo.com/UQ/ST3/us/imagesgoods/469903/item/usgoods_09_469903_3x4.jpg",
            ],
          },
          {
            color_name: colors.olive,
            images: [
              "https://image.uniqlo.com/UQ/ST3/us/imagesgoods/469903/item/usgoods_57_469903_3x4.jpg",
            ],
          },
          {
            color_name: colors.navyBlue,
            images: [
              "https://image.uniqlo.com/UQ/ST3/us/imagesgoods/469903/item/usgoods_69_469903_3x4.jpg",
            ],
          },
        ],
        size: [
          pantSizes[28],
          pantSizes[30],
          pantSizes[32],
          pantSizes[34],
          pantSizes[36],
          pantSizes[38],
          pantSizes[40],
          pantSizes[42],
          pantSizes[44],
        ],
        categories: [new mongoose.Types.ObjectId(obj['"Pants"'])],
        type: productType.BOTTOM_WEAR,
      },
      {
        name: "Fluffy Yarn Fleece Full-Zip Jacket",
        price: 39.9,
        mainImage:
          "https://image.uniqlo.com/UQ/ST3/WesternCommon/imagesgoods/449753/item/goods_10_449753_3x4.jpg",
        colors: [
          {
            color_name: colors.white,
            images: [
              "https://image.uniqlo.com/UQ/ST3/us/imagesgoods/449753/item/usgoods_01_449753_3x4.jpg",
            ],
          },
          {
            color_name: colors.lightGray,
            images: [
              "https://image.uniqlo.com/UQ/ST3/us/imagesgoods/449753/item/usgoods_02_449753_3x4.jpg",
            ],
          },
          {
            color_name: colors.black,
            images: [
              "https://image.uniqlo.com/UQ/ST3/us/imagesgoods/449753/item/usgoods_09_449753_3x4.jpg",
            ],
          },
          {
            color_name: colors.pink,
            images: [
              "https://image.uniqlo.com/UQ/ST3/us/imagesgoods/449753/item/usgoods_11_449753_3x4.jpg",
            ],
          },
          {
            color_name: colors.natural,
            images: [
              "https://image.uniqlo.com/UQ/ST3/us/imagesgoods/449753/item/usgoods_30_449753_3x4.jpg",
            ],
          },
          {
            color_name: colors.brown,
            images: [
              "https://image.uniqlo.com/UQ/ST3/us/imagesgoods/449753/item/usgoods_34_449753_3x4.jpg",
            ],
          },
          {
            color_name: colors.green,
            images: [
              "https://image.uniqlo.com/UQ/ST3/us/imagesgoods/449753/item/usgoods_52_449753_3x4.jpg",
            ],
          },
          {
            color_name: colors.skyBlue,
            images: [
              "https://image.uniqlo.com/UQ/ST3/us/imagesgoods/449753/item/usgoods_60_449753_3x4.jpg",
            ],
          },
          {
            color_name: colors.navyBlue,
            images: [
              "https://image.uniqlo.com/UQ/ST3/us/imagesgoods/449753/item/usgoods_69_449753_3x4.jpg",
            ],
          },
        ],
        size: ["XXS", "XS", "S", "M", "L", "XL"],
        categories: [new mongoose.Types.ObjectId(obj['"Jackets"'])],
        type: productType.TOP_WEAR,
      },
      {
        name: "HEATTECH Souffle Neck Gaiter",
        price: 14.9,
        mainImage:
          "https://image.uniqlo.com/UQ/ST3/WesternCommon/imagesgoods/470018/item/goods_32_470018_3x4.jpg",
        colors: [
          {
            color_name: colors.black,
            images: [
              "https://image.uniqlo.com/UQ/ST3/WesternCommon/imagesgoods/470018/item/goods_09_470018_3x4.jpg",
            ],
          },
        ],
        size: ["One Size"],
        categories: [new mongoose.Types.ObjectId(obj['"Accessories"'])],
        type: productType.ACCESSORIES,
      },
      {
        name: "Ribbed High Neck T-Shirt | Long Sleeve",
        price: 14.9,
        mainImage:
          "https://image.uniqlo.com/UQ/ST3/us/imagesgoods/470126/item/usgoods_11_470126_3x4.jpg",
        colors: [
          {
            color_name: colors.white,
            images: [
              "https://image.uniqlo.com/UQ/ST3/us/imagesgoods/470126/item/usgoods_01_470126_3x4.jpg",
            ],
          },
          {
            color_name: colors.lightGray,
            images: [
              "https://image.uniqlo.com/UQ/ST3/us/imagesgoods/470126/item/usgoods_02_470126_3x4.jpg",
            ],
          },
          {
            color_name: colors.black,
            images: [
              "https://image.uniqlo.com/UQ/ST3/us/imagesgoods/470126/item/usgoods_09_470126_3x4.jpg",
            ],
          },
          {
            color_name: colors.pink,
            images: [
              "https://image.uniqlo.com/UQ/ST3/us/imagesgoods/470126/item/usgoods_11_470126_3x4.jpg",
            ],
          },
          {
            color_name: colors.brown,
            images: [
              "https://image.uniqlo.com/UQ/ST3/us/imagesgoods/470126/item/usgoods_37_470126_3x4.jpg",
            ],
          },
          {
            color_name: colors.blue,
            images: [
              "https://image.uniqlo.com/UQ/ST3/us/imagesgoods/470126/item/usgoods_68_470126_3x4.jpg",
            ],
          },
        ],
        size: ["XXS", "XS", "S", "M", "L", "XL", "XXL"],
        categories: [new mongoose.Types.ObjectId(obj['"T-Shirts"'])],
        type: productType.TOP_WEAR,
      },
      {
        name: "HEATTECH Ribbed Beanie",
        price: 14.9,
        mainImage:
          "https://image.uniqlo.com/UQ/ST3/WesternCommon/imagesgoods/470015/item/goods_25_470015_3x4.jpg",
        colors: [
          {
            color_name: colors.white,
            images: [
              "https://image.uniqlo.com/UQ/ST3/WesternCommon/imagesgoods/470015/item/goods_01_470015_3x4.jpg",
            ],
          },
          {
            color_name: colors.darkGray,
            images: [
              "https://image.uniqlo.com/UQ/ST3/WesternCommon/imagesgoods/470015/item/goods_08_470015_3x4.jpg",
            ],
          },
          {
            color_name: colors.black,
            images: [
              "https://image.uniqlo.com/UQ/ST3/WesternCommon/imagesgoods/470015/item/goods_09_470015_3x4.jpg",
            ],
          },
          {
            color_name: colors.orange,
            images: [
              "https://image.uniqlo.com/UQ/ST3/WesternCommon/imagesgoods/470015/item/goods_25_470015_3x4.jpg",
            ],
          },
          {
            color_name: colors.blue,
            images: [
              "https://image.uniqlo.com/UQ/ST3/WesternCommon/imagesgoods/470015/item/goods_65_470015_3x4.jpg",
            ],
          },
        ],
        size: ["One Size"],
        categories: [new mongoose.Types.ObjectId(obj['"Accessories"'])],
        type: productType.ACCESSORIES,
      },
      {
        name: "PUFFTECH Compact Vest",
        price: 49.9,
        mainImage:
          "https://image.uniqlo.com/UQ/ST3/us/imagesgoods/469863/item/usgoods_32_469863_3x4.jpg",
        colors: [
          {
            color_name: colors.white,
            images: [
              "https://image.uniqlo.com/UQ/ST3/us/imagesgoods/469863/item/usgoods_01_469863_3x4.jpg",
            ],
          },
          {
            color_name: colors.black,
            images: [
              "https://image.uniqlo.com/UQ/ST3/us/imagesgoods/469863/item/usgoods_09_469863_3x4.jpg",
            ],
          },
          {
            color_name: colors.beige,
            images: [
              "https://image.uniqlo.com/UQ/ST3/us/imagesgoods/469863/item/usgoods_32_469863_3x4.jpg",
            ],
          },
          {
            color_name: colors.purple,
            images: [
              "https://image.uniqlo.com/UQ/ST3/us/imagesgoods/469863/item/usgoods_70_469863_3x4.jpg",
            ],
          },
        ],
        size: ["S", "M", "L"],
        categories: [new mongoose.Types.ObjectId(obj['"Suits"'])],
        type: productType.TOP_WEAR,
      },
      {
        name: "HEATTECH Leggings",
        price: 19.9,
        mainImage:
          "https://image.uniqlo.com/UQ/ST3/WesternCommon/imagesgoods/453166/item/goods_08_453166_3x4.jpg",
        colors: [
          {
            color_name: colors.darkGray,
            images: [
              "https://image.uniqlo.com/UQ/ST3/WesternCommon/imagesgoods/453166/item/goods_08_453166_3x4.jpg",
            ],
          },
          {
            color_name: colors.black,
            images: [
              "https://image.uniqlo.com/UQ/ST3/us/imagesgoods/453166/item/usgoods_09_453166_3x4.jpg",
            ],
          },
        ],
        size: [
          pantSizes[28],
          pantSizes[30],
          pantSizes[32],
          pantSizes[34],
          pantSizes[36],
          pantSizes[38],
          pantSizes[40],
          pantSizes[42],
          pantSizes[44],
        ],
        categories: [new mongoose.Types.ObjectId(obj['"Pants"'])],
        type: productType.BOTTOM_WEAR,
      },
      {
        name: "HEATTECH Leggings",
        price: 19.9,
        mainImage:
          "https://image.uniqlo.com/UQ/ST3/WesternCommon/imagesgoods/469836/item/goods_15_469836_3x4.jpg",
        colors: [
          {
            color_name: colors.darkGray,
            images: [
              "https://image.uniqlo.com/UQ/ST3/WesternCommon/imagesgoods/469836/item/goods_08_469836_3x4.jpg",
            ],
          },
          {
            color_name: colors.black,
            images: [
              "https://image.uniqlo.com/UQ/ST3/us/imagesgoods/469836/item/usgoods_09_469836_3x4.jpg",
            ],
          },
        ],
        size: [
          pantSizes[28],
          pantSizes[30],
          pantSizes[32],
          pantSizes[34],
          pantSizes[36],
          pantSizes[38],
          pantSizes[40],
          pantSizes[42],
          pantSizes[44],
        ],
        categories: [new mongoose.Types.ObjectId(obj['"Pants"'])],
        type: productType.BOTTOM_WEAR,
      },
      {
        name: "Oversized Short Jacket",
        price: 29.9,
        mainImage:
          "https://image.uniqlo.com/UQ/ST3/us/imagesgoods/469905/item/usgoods_55_469905_3x4.jpg",
        colors: [
          {
            color_name: colors.grey,
            images: [
              "https://image.uniqlo.com/UQ/ST3/us/imagesgoods/469905/item/usgoods_03_469905_3x4.jpg",
            ],
          },
          {
            color_name: colors.navyBlue,
            images: [
              "https://image.uniqlo.com/UQ/ST3/us/imagesgoods/469905/item/usgoods_69_469905_3x4.jpg",
            ],
          },
        ],
        size: ["S", "M", "L", "XL"],
        categories: [new mongoose.Types.ObjectId(obj['"Jackets"'])],
        type: productType.TOP_WEAR,
      },
    ];

    mockProduct.map(async (product) => {
      const randomIndexManufacturer = Math.floor(
        Math.random() * manufacturers.length
      );
      console.log(product.name);
      await Product.create({
        ...product,
        _manufacturer: manufacturers[randomIndexManufacturer]._id,
      });
    });

    console.log("Product added successfully");
  } catch (err) {
    console.error("Error adding products:", err);
  }
};

const generateComment = async () => {
  const mockComment = [
    "This is a great product!",
    "I love this product!",
    "The quality is amazing!",
    "The product is exactly as described!",
    "I would definitely recommend this product!",
    "The product is worth the price!",
    "I am very satisfied with this product!",
    "The product is very comfortable!",
    "I am very happy with this product!",
    "The product is very stylish!",
    "The product is very durable!",
    "The product is very versatile!",
    "I am very impressed with this product!",
    "The product is very trendy!",
    "The product is very fashionable!",
    "I am very pleased with this product!",
    "The product is very high quality!",
    "The product is very soft and comfortable!",
    "The product is very lightweight",
    "The product is very lightweight!",
    "The product is very breathable!",
    "The product is very easy to clean!",
    "The product is very well-made!",
    "The product is very affordable!",
    "The product is very practical!",
    "The product is very elegant!",
    "The product is very chic!",
    "The product is very modern!",
    "The product is very classic!",
    "The product is very unique!",
    "The product is very eye-catching!",
    "The product is very comfortable to wear!",
    "The product is very easy to wear!",
    "The product is very functional!",
    "The product is very stylish and comfortable!",
    "The product is very soft!",
    "The product is very warm!",
    "The product is very cool!",
    "The product is very trendy and fashionable!",
    "The product is very high-end!",
    "The product is very luxurious!",
    "The product is very premium!",
    "The product is very durable and long-lasting!",
    "The product is very versatile and practical!",
    "The product is very well-designed!",
    "The product is very high-quality and well-made!",
    "The product is very comfortable and stylish!",
    "The product is very soft and cozy!",
    "The product is very lightweight and breathable!",
    "The product is very easy to care for!",
    "The product is very affordable and practical!",
    "The product is very elegant and chic!",
    "The product is very modern and stylish!",
    "The product is very classic and timeless!",
    "The product is very unique and eye-catching!",
    "The product is very comfortable and easy to wear!",
    "The product is very functional and practical!",
    "The product is very stylish and trendy!",
    "The product is very soft and warm!",
    "The product is very cool and trendy!",
    "The product is very high-end and luxurious!",
    "The product is very premium and well-made!",
    "The product is very durable and long-lasting!",
    "The product is very versatile and practical!",
    "The product is very well-designed and stylish!",
    "The product is very high-quality and comfortable!",
    "The product is very soft and cozy!",
    "The product is very lightweight and breathable!",
  ];

  const users = await User.find({}, { _id: 1 });
  const products = await Product.find({}, { _id: 1 });

  const createCommentPromise = [];

  products.forEach(async (product) => {
    for (let i = 0; i < 5; i++) {
      const randomUser = users[Math.floor(Math.random() * users.length)];
      const randomComment =
        mockComment[Math.floor(Math.random() * mockComment.length)];
      const randomRate = Math.floor(Math.random() * 5) + 1;
      createCommentPromise.push(
        Comment.create({
          content: randomComment,
          rate: randomRate,
          _user: randomUser._id,
          _product: product._id,
        })
      );
    }

    await Promise.all(createCommentPromise);
  });

  await Promise.all(createCommentPromise);
  console.log("Comments added successfully");
};

const main = async () => {
  try {
    await clearDatabase();
    await generateManufacturer(mockManufacturers);
    await generateUser(mockUsers);
    await generateProductCategories(mockProductCategories);
    await generateProduct();
    await generateComment();
    console.log("All tasks completed successfully.");
  } catch (err) {
    console.error("An error occurred:", err);
    process.exit(1);
  }
  process.exit(0);
};

main();

// new wallets to be used for each double spend combination
const wallets = {
  delegateRegistration: [
    {
      passphrase: "dismiss note relax pepper whip brush spread salad street pigeon level wear",
      address: "MQA4JaH86GPpzRShHiTGiRYCpHHorPWEha"
    },
    {
      passphrase: "pet correct library frozen small park blue false month leaf ring display",
      address: "MBqt1PHzKpYtogEQTd2DRwkHuSLykCgK2q"
    },
    {
      passphrase: "patient hidden arch response eagle vast little swim film sibling first bundle",
      address: "MGMKVHuWYW9Ywk5bbCvbyyk33nKgg3VrNM"
    },
    {
      passphrase: "humble under erosion order clap cage odor business popular effort guilt flip",
      address: "MJnxbwGcbwRAyr5gexx64g1WfwCfPnAMvu"
    },
    {
      passphrase: "comic pony trigger neither velvet flash buddy drill lake ankle match priority",
      address: "MHuwvL6PmnHKCxUGrFp2QXn1UXqGty5Meo"
    }
  ],
  transfer: [
    {
      passphrase: "saddle ten swear quarter comfort fold grass core abandon coconut tourist never",
      address: "MJngqmbZX33Te9UNbFEvHqv1BNYQZjoGZ5"
    },
    {
      passphrase: "lizard gym ankle tell shaft trouble window gloom hover illness equal stadium",
      address: "MWVHVmQFLUygSdPuC5x5rzSaeqhV1AsZWq"
    },
    {
      passphrase: "bounce snack identify stone razor input ask shop during glide cargo metal",
      address: "MMLmUU75YdhF6NEGVLXh78xwsCqASLUwRn"
    },
    {
      passphrase: "predict pizza dune enable awake slender column circle thrive demand enough you",
      address: "MB2K2Gd5xUZ4Tj96pm6okvxNvoWMuqFYdi"
    },
    {
      passphrase: "spoon payment teach humor suggest ahead across tell differ recall window radar",
      address: "MH8kqyoKBFx6jovVfjbTHmDyvFs1Zr5wwo"
    }
  ],
  secondSignRegistration: [
    {
      passphrase: "burger prosper promote write youth keen cement project boss submit weekend more",
      address: "MW3q5ZSapTHc8b4ML6P47TY1ov7ytbfs7L"
    },
    {
      passphrase: "fragile school poet pilot dismiss mushroom orphan rescue tag myself around decline",
      address: "MVQJth86xD8B8ZNhTobXdpQwMe8DcTb2GH"
    },
    {
      passphrase: "tiny duty pistol place tooth cliff between fly orient into inquiry fiscal",
      address: "MMoR3KS41ijKBTqeGTGgvBnHKNRtiki4KP"
    },
    {
      passphrase: "pulse opinion green rebel young unit guess wise bind soup isolate wrestle",
      address: "MFT3c7muqeXb7UqEYJipCe56uB8wGQ1pFX"
    },
    {
      passphrase: "soda exclude whip pigeon enable smart merit over organ motor adapt shadow",
      address: "MTPnGJNmmBq6mKoHExJLyKxxem9ryK57J8"
    }
  ],
  vote: [
    {
      passphrase: "emerge claim nuclear baby undo chest flush misery brave quality zebra must",
      address: "MCZy2UNMWDqXuMMVMNXZLSEZXaj1Paq7gu"
    },
    {
      passphrase: "exact hockey isolate eye notice follow brand pull again put enforce marble",
      address: "MGpnHshiuGp35Uea2L7oGjd5v77ctEGfQp"
    },
    {
      passphrase: "mimic inner dilemma shoulder snake grace also lock silk possible layer strategy",
      address: "MUWc9Q5RCyyQgoeZCWwLdhpmP918PZN6FD"
    },
    {
      passphrase: "aunt liberty river neither wagon caution expire giraffe woman report rebuild ranch",
      address: "MAe4bABGYAX1ziNmxQeAYbn5XqgzUQxc2F"
    },
    {
      passphrase: "certain barrel exact voice provide pig release way remain cook mix eternal",
      address: "M9eq5eAxcWZSRCA7zahtS58Rvw48UbmUsy"
    }
  ]
}


const arktoshi = 10 ** 8

const fees = {
  transfer: 0.1 * arktoshi,
  vote: 1 * arktoshi,
  secondSignRegistration: 5 * arktoshi,
  delegateRegistration: 25 * arktoshi
}

module.exports = {
  wallets,
  fees
}
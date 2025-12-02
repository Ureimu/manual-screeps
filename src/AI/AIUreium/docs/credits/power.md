# 挖power

## power生成解析

参照[链接](https://github.com/screeps/backend-local/blob/1ffc31fc8f2af538c2cdfe92b45299d4a7b86f3e/lib/cronjobs.js#L228)


powerBank的decayTime固定为5000.

重新生成时间为
```ts
C.POWER_BANK_RESPAWN_TIME = 50000
Math.round(Math.random() * C.POWER_BANK_RESPAWN_TIME / 2 + C.POWER_BANK_RESPAWN_TIME * 0.75)
```
即均值为25000+37500 = 62500
每个房间平均62500tick生成一个powerBank。

power值为
```ts
C.POWER_BANK_CAPACITY_MAX = 5000
C.POWER_BANK_CAPACITY_MIN = 500
C.POWER_BANK_CAPACITY_CRIT = 0.3
let power = Math.floor(Math.random() * (C.POWER_BANK_CAPACITY_MAX - C.POWER_BANK_CAPACITY_MIN) + C.POWER_BANK_CAPACITY_MIN);
if (Math.random() < C.POWER_BANK_CAPACITY_CRIT) {
    power += C.POWER_BANK_CAPACITY_MAX;
}
```
即均值为0.5\*4500 + 500 + 0.3\*5000 = 4250
## creep配置

attacker: m20a20 energy: 50\*20+80\*20 = 2600
需要保证healer能奶上，所以是a20而不是a25
healer: m25h25 energy: 50\*25+250\*20 = 6250
carrier: m17c33 energy: 50\*50 = 2500

## 时长估算

bank有2M血量，attacker伤害为600。

出3个attacker，则需要1111tick。前提是走约7个房间就能摸到bank。

出4个attacker，则需要833tick，前提是走约13个房间就能摸到bank。

## 成本估算

一般四个attacker，四个healer和若干carrier

按平均出三个carrier算，能量消耗为43,100

按市价能量一单位10块算，成本为431,000

按平均搬运回4250power，power一单位2000块算，收入为 8,500,000

利润率为1972%

平均cpu消耗，约为3.0/tick

按时间计算，按照1500tick一轮，为5667c/tick

实际单个房间平均62500tick出一个powerBank，按照单个房间收10个过道房来算，6250tick一个，平均为1360c/tick

如果考虑到过道房有大量的只有一格空地的powerBank，由于decayTime固定为5000，无法挖掘的话，则按照减少20%估计，收入为1088c/tick

### 考虑只有一格空地的powerBank占比

解析代码。其只会选取周围有空格的坐标范围5~45的墙放置powerBank。

## boost方案

如果考虑boost，使用UH系列强化attack，使用LO系列强化heal，使用一级化合物则只需要出两组，需要的化合物量为

UH: 30\*20\*2 = 1200
LO: 30\*25\*2 = 1500

额外的能量为20\*45\*2 = 1800

额外的化合物成本为，1200\*350 + 1500\*200 = 720000

接近挖power平均收益的十分之一了。

考虑到2tick可以合1点一级化合物，自己合也够用了。

使用二级化合物的话，只需要出一组，约1500tick即可完成挖矿，可保证只有一格空地的powerBank也可被挖取。

额外的化合物成本为，1200\*350 + 1500\*200 = 945000
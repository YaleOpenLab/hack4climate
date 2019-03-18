;;;;;;;;;;;;;;;;
; Declarations ;
;;;;;;;;;;;;;;;;
extensions [table csv]

globals [
  country-map
  sum-emissions
  sum-expected-emissions
  growth-data
  emissions-data
  step
  sum-emission-usa
  sum-dependent-emissions
]

breed [ countries country ]
breed [ changeIndicators changeIndicator ]
breed [ policies policy ]

countries-own
[
  name
  gdp
  pop-growth
  environmentness
  reputation
  expected-emissions
  emissions
  emissions-matrix
  emissions-array
  emissions-growth
  emissions-growth-matrix
  emissions-growth-array
  policy-name
  cum-emissions
  cum-expected-emissions
  cum-dependent-emissions
  dependent-emissions
  rank
  rank1count
  rank2count
  rank3count
  rank4count
]

policies-own
[
  country-name
  policy-name
]

changeIndicators-own
[
  country-name
]

;;;;;;;;;;;;;;;;;;;
; Setup Functions ;
;;;;;;;;;;;;;;;;;;;
to setup
  clear-all
  reset-ticks
  plot-pen-reset
  import-drawing "darkmapwithflag.png"
  read-csvs
  setup-countries
  setup-country-map
  setup-changeIndicators
  setup-policies
end

to read-csvs
  set growth-data csv:from-file "growth-data.csv"
  set emissions-data csv:from-file "emissions-data.csv"
end


to setup-country-map
  ; table functions used to control country
  set country-map table:make
  table:put country-map "USA" 0
  table:put country-map "China" 1
  table:put country-map "EU" 2
  table:put country-map "Japan" 3
  table:put country-map "India" 4
  table:put country-map "Brazil" 5
  table:put country-map "Canada" 6
end

to setup-countries
  create-countries 1 [ set name "USA" set dependent-emissions 0 set expected-emissions 0 set gdp 8000 set pop-growth 6.4 set environmentness 0.025 set reputation 0.606 set emissions-matrix (sublist emissions-data 0 4) set emissions-growth-matrix (sublist growth-data 0 4) set policy-name usa-policy-name set emissions-growth 0 set emissions 0 setxy -11.1 -2.1 ]
  create-countries 1 [ set name "China" set dependent-emissions 0 set expected-emissions 0 set gdp 10000 set pop-growth 3.4 set environmentness 0.58 set reputation 0.408 set emissions-matrix (sublist emissions-data 4 8) set emissions-growth-matrix (sublist growth-data 4 8) set policy-name china-policy-name set emissions-growth 0 set emissions 0 setxy 16 0 ]
  create-countries 1 [ set name "EU" set dependent-emissions 0 set expected-emissions 0 set gdp 8000 set pop-growth 6.4 set environmentness 0.11 set reputation 0.659 set emissions-matrix (sublist emissions-data 8 12) set emissions-growth-matrix (sublist growth-data 8 12) set policy-name eu-policy-name set emissions-growth 0 set emissions 0 setxy 7.2 3.2 ]
  create-countries 1 [ set name "Japan" set dependent-emissions 0 set expected-emissions 0 set gdp 8000 set pop-growth 6.4 set environmentness 0.29 set reputation 0.504 set emissions-matrix (sublist emissions-data 12 16) set emissions-growth-matrix (sublist growth-data 12 16) set policy-name japan-policy-name set emissions-growth 0 set emissions 0 setxy 22.6 1.1 ]
  create-countries 1 [ set name "India" set dependent-emissions 0 set expected-emissions 0 set gdp 8000 set pop-growth 6.4 set environmentness 0.50 set reputation 0.225 set emissions-matrix (sublist emissions-data 16 20) set emissions-growth-matrix (sublist growth-data 16 20) set policy-name india-policy-name set emissions-growth 0 set emissions 0 setxy 14.3 -6.2 ]
  create-countries 1 [ set name "Brazil" set dependent-emissions 0 set expected-emissions 0 set gdp 8000 set pop-growth 6.4 set environmentness 0.061 set reputation 0.308 set emissions-matrix (sublist emissions-data 20 24) set emissions-growth-matrix (sublist growth-data 20 24) set policy-name brazil-policy-name set emissions-growth 0 set emissions 0 setxy -3.4 -10.8 ]
  create-countries 1 [ set name "Canada" set dependent-emissions 0 set expected-emissions 0 set gdp 8000 set pop-growth 6.4 set environmentness 0.024 set reputation 0.534 set emissions-matrix (sublist emissions-data 24 28) set emissions-growth-matrix (sublist growth-data 24 28) set policy-name canada-policy-name set emissions-growth 0 set emissions 0 setxy -11 6.5 ]

  ask countries [
    set size 0
    set label (word "Emissions:" emissions ", Growth:" emissions-growth dependent-emissions)

    ; filter data for country with selected policy
    if policy-name = "Low policy" [
      set emissions-growth-array item 0 emissions-growth-matrix
      set emissions-array item 0 emissions-matrix
      set rank 1
      set rank1count (rank1count + 1)
    ]
    if policy-name = "No policy" [
      set emissions-growth-array item 1 emissions-growth-matrix
      set emissions-array item 1 emissions-matrix
      set rank 2
      set rank2count (rank2count + 1)
    ]
    if policy-name = "Paris - Continued ambition" [
      set emissions-growth-array item 2 emissions-growth-matrix
      set emissions-array item 2 emissions-matrix
      set rank 3
      set rank3count (rank3count + 1)
    ]
    if policy-name = "Paris - Increased ambition" [
      set emissions-growth-array item 3 emissions-growth-matrix
      set emissions-array item 3 emissions-matrix
      set rank 4
      set rank4count (rank4count + 1)
    ]
  ]
end

to setup-changeIndicators
  create-changeIndicators 1 [ set country-name "USA" setxy -13.3 -3.5 ]
  create-changeIndicators 1 [ set country-name "China" setxy 13.5 2 ]
  create-changeIndicators 1 [ set country-name "EU" setxy 3.6 5.3 ]
  create-changeIndicators 1 [ set country-name "Japan" setxy 19 3.5 ]
  create-changeIndicators 1 [ set country-name "India" setxy 10.9 -7.5 ]
  create-changeIndicators 1 [ set country-name "Brazil" setxy -7 -12.2 ]
  create-changeIndicators 1 [ set country-name "Canada" setxy -14.3 9 ]

  ask changeIndicators [
    set size 0
  ]
end

to setup-policies
  create-policies 1 [ set country-name "USA" set policy-name usa-policy-name setxy -15.6 -3.5 ]
  create-policies 1 [ set country-name "China" set policy-name china-policy-name setxy 11.2 2 ]
  create-policies 1 [ set country-name "EU" set policy-name eu-policy-name setxy 1 5.3 ]
  create-policies 1 [ set country-name "Japan" set policy-name japan-policy-name setxy 16.7 3.5 ]
  create-policies 1 [ set country-name "India" set policy-name india-policy-name setxy 8.3 -7.5 ]
  create-policies 1 [ set country-name "Brazil" set policy-name brazil-policy-name setxy -9.3 -12.2 ]
  create-policies 1 [ set country-name "Canada" set policy-name canada-policy-name setxy -16.6 9 ]

  ask policies [
    set shape "circle"
    set size 2
    if policy-name = "Low policy" [ set color orange ]
    if policy-name = "No policy" [ set color magenta ]
    if policy-name = "Paris - Continued ambition" [ set color pink ]
    if policy-name = "Paris - Increased ambition" [ set color yellow ]
  ]
end

;;;;;;;;;;;;;;;;;
; Run Functions ;
;;;;;;;;;;;;;;;;;
to go
;  ask country table:get country-map "USA" [
;    set emissions (emissions + 3)
;  ]

  ask countries [
    ; update indicator direction
    if emissions-growth = 0 [
      ask changeIndicators with [country-name = [name] of myself] [set size 0]
    ]
    if emissions-growth < 0 [
      ask changeIndicators with [country-name = [name] of myself] [set shape "triangledown" set size 2]
    ]
    if emissions-growth > 0 [
      ask changeIndicators with [country-name = [name] of myself] [set shape "triangleup" set size 2]
    ]

    ; update weights based on policy

    ; update
    set step 10000
    if ticks mod step = 0 [
      set emissions-growth item (ticks / step) emissions-growth-array
      set emissions item (ticks / step) emissions-array
      set cum-emissions (cum-emissions + emissions)

      ; dependent
      set dependent-emissions ( dependent-emissions * (1 - 0.01 * (rank1count * (1 - rank) + rank2count * (2 - rank) + rank3count * (3 - rank) + rank4count * (4 - rank))) )
      set dependent-emissions (emissions - 10000)
      set cum-dependent-emissions (cum-dependent-emissions + dependent-emissions)
    ]

    set label (word "Emissions:" emissions ", Growth:" emissions-growth)
  ]

  update-global
  tick
end


to update-global
  set sum-emissions sum [cum-emissions] of countries
  set sum-expected-emissions sum [cum-expected-emissions] of countries
  set sum-dependent-emissions sum [cum-dependent-emissions] of countries
end




; consider history of actions for each country
@#$#@#$#@
GRAPHICS-WINDOW
468
10
1161
480
-1
-1
13.98
1
10
1
1
1
0
1
1
1
-24
24
-16
16
0
0
1
ticks
30.0

BUTTON
66
375
129
408
go
go
T
1
T
OBSERVER
NIL
NIL
NIL
NIL
1

BUTTON
2
411
77
444
go once
go
NIL
1
T
OBSERVER
NIL
NIL
NIL
NIL
1

PLOT
153
253
463
461
Global Emissions
Time
Emissions
0.0
100000.0
0.0
1000000.0
false
false
"" ""
PENS
"pen-1" 1.0 0 -8053223 true "" "plot sum-emissions"
"pen-2" 1.0 0 -15040220 true "" "plot sum-dependent-emissions"

PLOT
-3
10
157
130
USA
Time
Emissions
0.0
100000.0
0.0
1000000.0
false
false
"" ""
PENS
"pen-1" 1.0 0 -8053223 true "" "plot [ cum-emissions ] of country 0"
"pen-2" 1.0 0 -15040220 true "" "plot [ cum-dependent-emissions ] of country 0"

PLOT
150
10
310
130
China
NIL
NIL
0.0
100000.0
0.0
1000000.0
false
false
"" ""
PENS
"pen-1" 1.0 0 -8053223 true "" "plot [ cum-emissions ] of country 1"
"pen-2" 1.0 0 -15040220 true "" "plot [ cum-dependent-emissions ] of country 1"

PLOT
305
10
465
130
EU
NIL
NIL
0.0
100000.0
0.0
1000000.0
false
false
"" ""
PENS
"pen-1" 1.0 0 -8053223 true "" "plot [ cum-emissions ] of country 2"
"pen-2" 1.0 0 -15040220 true "" "plot [ cum-dependent-emissions ] of country 2"

PLOT
-3
132
157
252
Japan
NIL
NIL
0.0
100000.0
0.0
1000000.0
false
false
"" ""
PENS
"pen-1" 1.0 0 -8053223 true "" "plot [ cum-emissions ] of country 3"
"pen-2" 1.0 0 -15040220 true "" "plot [ cum-dependent-emissions ] of country 3"

PLOT
151
132
311
252
India
NIL
NIL
0.0
100000.0
0.0
1000000.0
false
false
"" ""
PENS
"pen-1" 1.0 0 -8053223 true "" "plot [ cum-emissions ] of country 4"
"pen-2" 1.0 0 -15040220 true "" "plot [ cum-dependent-emissions ] of country 4"

PLOT
306
132
466
252
Brazil
NIL
NIL
0.0
100000.0
0.0
1000000.0
false
false
"" ""
PENS
"pen-1" 1.0 0 -8053223 true "" "plot [ cum-emissions ] of country 5"
"pen-2" 1.0 0 -15040220 true "" "plot [ cum-dependent-emissions ] of country 5"

PLOT
-6
253
154
373
Canada
NIL
NIL
0.0
100000.0
0.0
1000000.0
false
false
"" ""
PENS
"pen-1" 1.0 0 -8053223 true "" "plot [ cum-emissions ] of country 6"
"pen-2" 1.0 0 -15040220 true "" "plot [ cum-dependent-emissions ] of country 6"

CHOOSER
1163
10
1356
55
usa-policy-name
usa-policy-name
"Low policy" "No policy" "Paris - Continued ambition" "Paris - Increased ambition"
1

CHOOSER
1162
144
1355
189
japan-policy-name
japan-policy-name
"Low policy" "No policy" "Paris - Continued ambition" "Paris - Increased ambition"
3

BUTTON
2
375
65
408
setup
setup
NIL
1
T
OBSERVER
NIL
NIL
NIL
NIL
1

CHOOSER
1163
54
1356
99
china-policy-name
china-policy-name
"Low policy" "No policy" "Paris - Continued ambition" "Paris - Increased ambition"
1

CHOOSER
1163
99
1356
144
eu-policy-name
eu-policy-name
"Low policy" "No policy" "Paris - Continued ambition" "Paris - Increased ambition"
0

CHOOSER
1161
189
1354
234
india-policy-name
india-policy-name
"Low policy" "No policy" "Paris - Continued ambition" "Paris - Increased ambition"
2

CHOOSER
1161
233
1354
278
brazil-policy-name
brazil-policy-name
"Low policy" "No policy" "Paris - Continued ambition" "Paris - Increased ambition"
2

CHOOSER
1161
278
1354
323
canada-policy-name
canada-policy-name
"Low policy" "No policy" "Paris - Continued ambition" "Paris - Increased ambition"
3

MONITOR
362
397
454
442
NIL
sum-emissions
17
1
11

@#$#@#$#@
## WHAT IS IT?

(a general understanding of what the model is trying to show or explain)

## HOW IT WORKS

(what rules the agents use to create the overall behavior of the model)

## HOW TO USE IT

(how to use the model, including a description of each of the items in the Interface tab)

## THINGS TO NOTICE

(suggested things for the user to notice while running the model)

## THINGS TO TRY

(suggested things for the user to try to do (move sliders, switches, etc.) with the model)

## EXTENDING THE MODEL

(suggested things to add or change in the Code tab to make the model more complicated, detailed, accurate, etc.)

## NETLOGO FEATURES

(interesting or unusual features of NetLogo that the model uses, particularly in the Code tab; or where workarounds were needed for missing features)

## RELATED MODELS

(models in the NetLogo Models Library and elsewhere which are of related interest)

## CREDITS AND REFERENCES

(a reference to the model's URL on the web if it has one, as well as any other necessary credits, citations, and links)
@#$#@#$#@
default
true
0
Polygon -7500403 true true 150 5 40 250 150 205 260 250

airplane
true
0
Polygon -7500403 true true 150 0 135 15 120 60 120 105 15 165 15 195 120 180 135 240 105 270 120 285 150 270 180 285 210 270 165 240 180 180 285 195 285 165 180 105 180 60 165 15

arrow
true
0
Polygon -7500403 true true 150 0 0 150 105 150 105 293 195 293 195 150 300 150

box
false
0
Polygon -7500403 true true 150 285 285 225 285 75 150 135
Polygon -7500403 true true 150 135 15 75 150 15 285 75
Polygon -7500403 true true 15 75 15 225 150 285 150 135
Line -16777216 false 150 285 150 135
Line -16777216 false 150 135 15 75
Line -16777216 false 150 135 285 75

bug
true
0
Circle -7500403 true true 96 182 108
Circle -7500403 true true 110 127 80
Circle -7500403 true true 110 75 80
Line -7500403 true 150 100 80 30
Line -7500403 true 150 100 220 30

butterfly
true
0
Polygon -7500403 true true 150 165 209 199 225 225 225 255 195 270 165 255 150 240
Polygon -7500403 true true 150 165 89 198 75 225 75 255 105 270 135 255 150 240
Polygon -7500403 true true 139 148 100 105 55 90 25 90 10 105 10 135 25 180 40 195 85 194 139 163
Polygon -7500403 true true 162 150 200 105 245 90 275 90 290 105 290 135 275 180 260 195 215 195 162 165
Polygon -16777216 true false 150 255 135 225 120 150 135 120 150 105 165 120 180 150 165 225
Circle -16777216 true false 135 90 30
Line -16777216 false 150 105 195 60
Line -16777216 false 150 105 105 60

car
false
0
Polygon -7500403 true true 300 180 279 164 261 144 240 135 226 132 213 106 203 84 185 63 159 50 135 50 75 60 0 150 0 165 0 225 300 225 300 180
Circle -16777216 true false 180 180 90
Circle -16777216 true false 30 180 90
Polygon -16777216 true false 162 80 132 78 134 135 209 135 194 105 189 96 180 89
Circle -7500403 true true 47 195 58
Circle -7500403 true true 195 195 58

check
false
0
Polygon -10899396 true false 55 138 22 155 53 196 72 232 91 288 111 272 136 258 147 220 167 174 208 113 280 24 257 7 192 78 151 138 106 213 87 182

circle
false
0
Circle -7500403 true true 0 0 300

circle 2
false
0
Circle -7500403 true true 0 0 300
Circle -16777216 true false 30 30 240

cow
false
0
Polygon -7500403 true true 200 193 197 249 179 249 177 196 166 187 140 189 93 191 78 179 72 211 49 209 48 181 37 149 25 120 25 89 45 72 103 84 179 75 198 76 252 64 272 81 293 103 285 121 255 121 242 118 224 167
Polygon -7500403 true true 73 210 86 251 62 249 48 208
Polygon -7500403 true true 25 114 16 195 9 204 23 213 25 200 39 123

cylinder
false
0
Circle -7500403 true true 0 0 300

dot
false
0
Circle -7500403 true true 90 90 120

face happy
false
0
Circle -7500403 true true 8 8 285
Circle -16777216 true false 60 75 60
Circle -16777216 true false 180 75 60
Polygon -16777216 true false 150 255 90 239 62 213 47 191 67 179 90 203 109 218 150 225 192 218 210 203 227 181 251 194 236 217 212 240

face neutral
false
0
Circle -7500403 true true 8 7 285
Circle -16777216 true false 60 75 60
Circle -16777216 true false 180 75 60
Rectangle -16777216 true false 60 195 240 225

face sad
false
0
Circle -7500403 true true 8 8 285
Circle -16777216 true false 60 75 60
Circle -16777216 true false 180 75 60
Polygon -16777216 true false 150 168 90 184 62 210 47 232 67 244 90 220 109 205 150 198 192 205 210 220 227 242 251 229 236 206 212 183

fish
false
0
Polygon -1 true false 44 131 21 87 15 86 0 120 15 150 0 180 13 214 20 212 45 166
Polygon -1 true false 135 195 119 235 95 218 76 210 46 204 60 165
Polygon -1 true false 75 45 83 77 71 103 86 114 166 78 135 60
Polygon -7500403 true true 30 136 151 77 226 81 280 119 292 146 292 160 287 170 270 195 195 210 151 212 30 166
Circle -16777216 true false 215 106 30

flag
false
0
Rectangle -7500403 true true 60 15 75 300
Polygon -7500403 true true 90 150 270 90 90 30
Line -7500403 true 75 135 90 135
Line -7500403 true 75 45 90 45

flower
false
0
Polygon -10899396 true false 135 120 165 165 180 210 180 240 150 300 165 300 195 240 195 195 165 135
Circle -7500403 true true 85 132 38
Circle -7500403 true true 130 147 38
Circle -7500403 true true 192 85 38
Circle -7500403 true true 85 40 38
Circle -7500403 true true 177 40 38
Circle -7500403 true true 177 132 38
Circle -7500403 true true 70 85 38
Circle -7500403 true true 130 25 38
Circle -7500403 true true 96 51 108
Circle -16777216 true false 113 68 74
Polygon -10899396 true false 189 233 219 188 249 173 279 188 234 218
Polygon -10899396 true false 180 255 150 210 105 210 75 240 135 240

house
false
0
Rectangle -7500403 true true 45 120 255 285
Rectangle -16777216 true false 120 210 180 285
Polygon -7500403 true true 15 120 150 15 285 120
Line -16777216 false 30 120 270 120

leaf
false
0
Polygon -7500403 true true 150 210 135 195 120 210 60 210 30 195 60 180 60 165 15 135 30 120 15 105 40 104 45 90 60 90 90 105 105 120 120 120 105 60 120 60 135 30 150 15 165 30 180 60 195 60 180 120 195 120 210 105 240 90 255 90 263 104 285 105 270 120 285 135 240 165 240 180 270 195 240 210 180 210 165 195
Polygon -7500403 true true 135 195 135 240 120 255 105 255 105 285 135 285 165 240 165 195

line
true
0
Line -7500403 true 150 0 150 300

line half
true
0
Line -7500403 true 150 0 150 150

m
true
0
Line -7500403 true 30 105 30 165
Line -7500403 true 60 165 30 105
Line -7500403 true 60 165 75 105
Line -7500403 true 75 105 90 165

pentagon
false
0
Polygon -7500403 true true 150 15 15 120 60 285 240 285 285 120

person
false
0
Circle -7500403 true true 110 5 80
Polygon -7500403 true true 105 90 120 195 90 285 105 300 135 300 150 225 165 300 195 300 210 285 180 195 195 90
Rectangle -7500403 true true 127 79 172 94
Polygon -7500403 true true 195 90 240 150 225 180 165 105
Polygon -7500403 true true 105 90 60 150 75 180 135 105

plant
false
0
Rectangle -7500403 true true 135 90 165 300
Polygon -7500403 true true 135 255 90 210 45 195 75 255 135 285
Polygon -7500403 true true 165 255 210 210 255 195 225 255 165 285
Polygon -7500403 true true 135 180 90 135 45 120 75 180 135 210
Polygon -7500403 true true 165 180 165 210 225 180 255 120 210 135
Polygon -7500403 true true 135 105 90 60 45 45 75 105 135 135
Polygon -7500403 true true 165 105 165 135 225 105 255 45 210 60
Polygon -7500403 true true 135 90 120 45 150 15 180 45 165 90

sheep
false
15
Circle -1 true true 203 65 88
Circle -1 true true 70 65 162
Circle -1 true true 150 105 120
Polygon -7500403 true false 218 120 240 165 255 165 278 120
Circle -7500403 true false 214 72 67
Rectangle -1 true true 164 223 179 298
Polygon -1 true true 45 285 30 285 30 240 15 195 45 210
Circle -1 true true 3 83 150
Rectangle -1 true true 65 221 80 296
Polygon -1 true true 195 285 210 285 210 240 240 210 195 210
Polygon -7500403 true false 276 85 285 105 302 99 294 83
Polygon -7500403 true false 219 85 210 105 193 99 201 83

square
false
0
Rectangle -7500403 true true 30 30 270 270

square 2
false
0
Rectangle -7500403 true true 30 30 270 270
Rectangle -16777216 true false 60 60 240 240

star
false
0
Polygon -7500403 true true 151 1 185 108 298 108 207 175 242 282 151 216 59 282 94 175 3 108 116 108

target
false
0
Circle -7500403 true true 0 0 300
Circle -16777216 true false 30 30 240
Circle -7500403 true true 60 60 180
Circle -16777216 true false 90 90 120
Circle -7500403 true true 120 120 60

tree
false
0
Circle -7500403 true true 118 3 94
Rectangle -6459832 true false 120 195 180 300
Circle -7500403 true true 65 21 108
Circle -7500403 true true 116 41 127
Circle -7500403 true true 45 90 120
Circle -7500403 true true 104 74 152

triangle
false
0
Polygon -7500403 true true 150 30 15 255 285 255

triangle 2
false
0
Polygon -7500403 true true 150 30 15 255 285 255
Polygon -16777216 true false 151 99 225 223 75 224

triangledown
false
0
Polygon -10899396 true false 150 270 285 45 15 45

triangleup
false
0
Polygon -2674135 true false 150 30 15 255 285 255

truck
false
0
Rectangle -7500403 true true 4 45 195 187
Polygon -7500403 true true 296 193 296 150 259 134 244 104 208 104 207 194
Rectangle -1 true false 195 60 195 105
Polygon -16777216 true false 238 112 252 141 219 141 218 112
Circle -16777216 true false 234 174 42
Rectangle -7500403 true true 181 185 214 194
Circle -16777216 true false 144 174 42
Circle -16777216 true false 24 174 42
Circle -7500403 false true 24 174 42
Circle -7500403 false true 144 174 42
Circle -7500403 false true 234 174 42

turtle
true
0
Polygon -10899396 true false 215 204 240 233 246 254 228 266 215 252 193 210
Polygon -10899396 true false 195 90 225 75 245 75 260 89 269 108 261 124 240 105 225 105 210 105
Polygon -10899396 true false 105 90 75 75 55 75 40 89 31 108 39 124 60 105 75 105 90 105
Polygon -10899396 true false 132 85 134 64 107 51 108 17 150 2 192 18 192 52 169 65 172 87
Polygon -10899396 true false 85 204 60 233 54 254 72 266 85 252 107 210
Polygon -7500403 true true 119 75 179 75 209 101 224 135 220 225 175 261 128 261 81 224 74 135 88 99

wheel
false
0
Circle -7500403 true true 3 3 294
Circle -16777216 true false 30 30 240
Line -7500403 true 150 285 150 15
Line -7500403 true 15 150 285 150
Circle -7500403 true true 120 120 60
Line -7500403 true 216 40 79 269
Line -7500403 true 40 84 269 221
Line -7500403 true 40 216 269 79
Line -7500403 true 84 40 221 269

wolf
false
0
Polygon -16777216 true false 253 133 245 131 245 133
Polygon -7500403 true true 2 194 13 197 30 191 38 193 38 205 20 226 20 257 27 265 38 266 40 260 31 253 31 230 60 206 68 198 75 209 66 228 65 243 82 261 84 268 100 267 103 261 77 239 79 231 100 207 98 196 119 201 143 202 160 195 166 210 172 213 173 238 167 251 160 248 154 265 169 264 178 247 186 240 198 260 200 271 217 271 219 262 207 258 195 230 192 198 210 184 227 164 242 144 259 145 284 151 277 141 293 140 299 134 297 127 273 119 270 105
Polygon -7500403 true true -1 195 14 180 36 166 40 153 53 140 82 131 134 133 159 126 188 115 227 108 236 102 238 98 268 86 269 92 281 87 269 103 269 113

x
false
0
Polygon -2674135 true false 270 75 225 30 30 225 75 270
Polygon -2674135 true false 30 75 75 30 270 225 225 270
@#$#@#$#@
NetLogo 6.0.4
@#$#@#$#@
@#$#@#$#@
@#$#@#$#@
@#$#@#$#@
@#$#@#$#@
default
0.0
-0.2 0 0.0 1.0
0.0 1 1.0 0.0
0.2 0 0.0 1.0
link direction
true
0
Line -7500403 true 150 150 90 180
Line -7500403 true 150 150 210 180
@#$#@#$#@
0
@#$#@#$#@

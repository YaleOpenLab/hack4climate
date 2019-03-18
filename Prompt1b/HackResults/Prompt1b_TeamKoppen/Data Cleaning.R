library('xml2')
library('rvest')

commitments <- read.csv("hack4climate_commitments_070319.csv")
context <- read.csv("hack4climate_contextuals_090319.csv")
metadata <- read.csv("Metadata_Subnationals - Commitments Metadata.csv")
area <- read.csv("Area & Population Data - Sheet1 (1).csv")
area2 <- read.csv("area.csv")
longlat <- read.csv("downloaded_longlat.csv")

#just US commitments
UScommitments <- commitments[commitments$country == "United States of America", ]
UScommitments$entity_type == "City"
UScommitments$entity_type[967]
#just cities
US_city_com <- UScommitments[UScommitments$entity_type == "City",] #1410
US_com <- data.frame(US_city_com$name, US_city_com$action_description)
write.csv(US_com,
          file = "commitments.csv")
View(US_com)


#just US context
UScontext <- context[context$iso == "USA",] #520
US_city_cont <- UScontext[UScontext$entity_type == "City", ] #498

sum(!is.na(US_city_cont$gdp_per_capita))
sum(US_city_cont$population > 50000) #270
sum(!is.na(US_city_cont$population)) 

setdiff(US_city_cont$right, area$City)

head(area$City)

length(area$jcity)
area$jcity <- gsub(".{4}$", "", area$City)
US_city_cont$jcity <- gsub(".{4}$", "", US_city_cont$right) 
population <- US_city_cont[c("population", "jcity")]

head(population)
head(area)

install.packages("rwunderground")
library(rwunderground)

US_city_cont$lat[1]
US_city_cont$lng[1]

ll <- data.frame(US_city_cont$lat, US_city_cont$lng, US_city_cont$jcity, US_city_cont$state)
names(ll) <- c("lat", "long", "jcity", "state")

test <- merge(ll, area, by = c("jcity", "jcity"))

length(setdiff(area$City, US_city_cont$right))
length(area$City)
length(US_city_cont$jcity)
US_city_cont$state
US_city_cont$stabb <- factor(US_city_cont$state)

levels(US_city_cont$stabb) <- state.abb
head(US_city_cont$stabb)
head(US_city_cont$state)
length(levels(US_city_cont$stabb))
setdiff(US_city_cont$state, state.name)
US_city_cont <- US_city_cont[US_city_cont$state != "Puerto Rico",]

#REDO
ll$stab <- factor(ll$state)
all(!is.na(ll$state))
ll <- ll[!is.na(ll$state), ]
levels(ll$stab) == state.name
setdiff(state.name, levels(ll$stab))
area2 <- area2[area2$State != "", ]
test <- merge(area2, ll, by = c("jcity", "jcity"))

head(area2)
length(area2$jcity == ll$jcity)
length(ll$jcity)
length(setdiff(ll$jcity, area2$jcity))
setdiff(area2$State, ll$state)

differences <- setdiff(area2$jcity, ll$jcity)

matcities <- area$jcity[differences]


write.csv(ll,
          file = "lat_long.csv")
write.csv(area2,
          file = "cleaneddensity.csv")

area2$jcity <- gsub(".{4}$", "", area2$City)
36651-739
length(longlat$city) #36651

length(setdiff(longlat$city, area2$jcity)) #22569 cities with less than 50,000 or we don't have data on
longlat$city
area2$jcity

nchar(area2$jcity)
try <- subset(area2, nchar(area2$jcity) > 2) #cleaning of double letter cities
area2 <- try

nrow(area2)
head(area2)
llcities <- factor(longlat$city)
llcities
try <- area2
long <- NA
lat <- NA

#start new
names(US_city_com)
US_city_com$ghg_reduction_target
US_city_com$ghg_reduction_target #append this
US_city_com$jcity <- gsub(".{4}$", "", US_city_com$name)

y <- NA
US_city_com$ghg_reduction_target[US_city_com$name == "Austin, TX"]

US_city_com$name[US_city_com$ghg_reduction_target != ""]
US_city_com$ghg_reduction_target[US_city_com$ghg_reduction_target != ""]
US_city_com$action_description[US_city_com$action_description != ""]

write.csv()
r <- data.frame(US_city_com$name[US_city_com$action_description != ""],
                US_city_com$action_description[US_city_com$action_description != ""])
write.csv(r,
          file = "targetcities.csv")


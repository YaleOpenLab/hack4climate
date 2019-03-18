install.packages('kgc')

library(kgc)

data <- data.frame(Site = c("New York"), Longitude = c(40), Latitude = c(-74))

x <- read.csv("~/Downloads/lat_long.csv", as.is = T)

data <- data.frame(Site = x$jcity, Longitude = x$long, Latitude = x$lat)
data <- data.frame(data,
                   rndCoord.lon = RoundCoordinates(data$Longitude),
                   rndCoord.lat = RoundCoordinates(data$Latitude))
data <- data.frame(data, ClimateZ=LookupCZ(data))

x$koppen <- data$ClimateZ

y <- read.csv("~/Downloads/cleaneddensity.csv", as.is = T)
head(y)
head(x)
# keeps only y entries that are in x
newY <- y[y$jcity %in% x$jcity,]

# decides which y to keep
keep <- rep(FALSE, nrow(y))

x$jcity[15] == y$jcity[20]
x$state[15] == y$State[20]

for(i in 1:nrow(y)){
  for(j in 1:nrow(x)){
    if(y$jcity[i] == x$jcity[j]){
      if(y$State[i] == x$state[j]){
        keep[i] <- TRUE
      }
      else{}
    }
    else{}
  }
}

newY <- y[keep,]

keepX <- rep(FALSE, nrow(x))

for(i in 1:nrow(x)){
  for(j in 1:nrow(newY)){
    if(x$jcity[i] == newY$jcity[j]){
      if(x$state[i] == newY$State[j]){
        keepX[i] <- TRUE
      }
      else{}
    }
    else{}
  }
}

newX <- x[keepX,]

newY$lat <- newX$lat
newY$long <- newX$long
newY$koppen <- newX$koppen

write.csv(newY, "data_3pm.csv")

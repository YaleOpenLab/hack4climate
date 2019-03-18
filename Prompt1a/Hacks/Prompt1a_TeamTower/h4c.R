library(readxl)
library(dplyr) 
library (tidyverse)
reco <- read_excel("2014.records.xlsx")

targ <- read_excel("2030.targets.xlsx")

socioecon <- read_excel("2014.socioecon.xlsx")

x <- left_join(reco, targ, by='Country')

x$abs.dif <- x$Value - x$Total
x$pct.change <- (x$Value - x$Total)/x$Total * 100

y <- select (x,-c(Year.x, ISO, Year.y, Range, Label))

z <- left_join(y, socioecon, by='Country')

z$popul <- z$GDP/z$`GDP/c`

z$totalpc <- z$Total/z$popul 
z$valuepc <- z$Value/z$popul
z$abs.dif.pc <- z$abs.dif/z$popul

no.na <- na.omit(z)

ggplot(data=no.na, aes(x=abs.dif.pc, y=Country)) +
      geom_bar(stat="identity")

write.csv(no.na, 'no.na.csv')

wss <- read_excel("wss.xlsx")

mtx <- as.matrix(wss)

wss <- numeric(15)
for (k in 1:15) {
      wss[k] <- sum(kmeans(mtx, centers = k, nstart = 25)$withinss)
      }

plot(1:15, wss, type = "b", xlab = "Number of clusters", ylab = "Within Sum of Squares")

km <- kmeans(mtx, 4, nstart = 25)

df = as.data.frame(mtx)
df$cluster = factor(km$cluster)
centers=as.data.frame(km$centers)

g1 = ggplot(data=df, aes(x=GDP, y=popul, color=cluster )) + 
      geom_point() + theme(legend.position="right") +
      geom_point(data=centers, aes(x=GDP,y=popul), 
                 size=10, alpha=.3, show.legend = FALSE, color=as.factor(c(1,2,3)))

g2 =ggplot(data=df, aes(x=GDP, y=abs.dif, color=cluster )) + 
      geom_point() + 
      geom_point(data=centers, aes(x=GDP,y=abs.dif, color=as.factor(c(1,2,3))), 
                 size=10, alpha=.3, show.legend = FALSE)

g3 = ggplot(data=df, aes(x=popul, y=abs.dif, color=cluster )) + 
      geom_point() +
      geom_point(data=centers, aes(x=popul, y=abs.dif, color=as.factor(c(1,2,3))), 
                 size=10, alpha=.3, show.legend = FALSE)

tmp = ggplot_gtable(ggplot_build(g1)) 

grid.arrange(arrangeGrob(g1 + theme(legend.position="none"),
                         g2 + theme(legend.position="none"),
                         g3 + theme(legend.position="none"),
                         main ="Carbon Budget Cluster Analysis", ncol=1))

md <- read_excel("model.data.xlsx")

md1 <- spread(md, Country, Total)

for (i in 1:ncol(md1)) {
      lmfit <- lm([, i] ~ Year, md1)
      resultsList[[i]] <- summary(lmfit_i)
}

dflist <- list()

for (i in seq(1,ncol(md1) - 1)) {
      dflist[[i]] <- data.frame(md1[, c(1, i + 1)])
}
for (i in dflist) {
      model <- lm(y ~ x, dflist[i])
}
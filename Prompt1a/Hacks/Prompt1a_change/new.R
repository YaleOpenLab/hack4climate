co2 <- read.csv("~/Documents/Yale-NUS/Hack4Climate/co2.csv", na.strings="", stringsAsFactors=FALSE)

colnames(co2)[3] <- "total_emissions"

co2$total_emissions <- gsub(",", "", co2$total_emissions)

emissions_by_year <- function() {
  total <- numeric(165)
  for (i in seq_len(165)) {
    emissions <- co2[co2$Year == (i+1849), ]
    emissions_removed <- emissions[!is.na(emissions$total_emissions), ]
    total[i] <- sum(as.numeric(emissions_removed[ ,3]))
  }
  total
}

all_emissions <- emissions_by_year() # 1850-2014
temperature2$emissions <- all_emissions[10:125]

temperature2$emissions_scaled <- all_emissions[10:125]/0.76


plot(temperature2$avg_temp ~ temperature2$emissions)
fit <- lm(temperature2$avg_temp ~ temperature2$emissions)
abline(fit)
summary(fit)

esquisse::esquisser()

library(ggplot2)

ggplot(data = temperature2) +
  aes(x = emissions_scaled, y = avg_temp) +
  geom_point(color = '#0c4c8a') +
  geom_smooth(span = 1) +
  labs(title = 'Temperature vs. Total GHG emissions (accounting for 40 years of delayed warming)',
    x = 'Total GHG emissions (Mt)',
    y = 'Temperature (°C)') +
  theme_minimal()
# predicted temp change
emissions_for_pred <- emissions_by_year()[131:165]

ghg_1980_2014 <- sum(emissions_for_pred)/0.76 # scale for ghg

ghg_1980_2014*0.00003389



# ==========

20600


temperature3 <- temperature2[86:116, ]

temperature3$emissions <- all_emissions[95:125]

plot(temperature3$avg_temp ~ temperature3$emissions)
fit2 <- lm(temperature3$avg_temp ~ temperature3$emissions)
abline(fit2)
summary(fit2)

library(BiocManager)
library(Biobase)

pdf_name <- "emissions.pdf"
pdf(file = pdf_name, width = 12, height = 6)
par(mar = c(3, 5, 3, 13),
    mgp = c(2, 0.75, 0))
ggplot(data = temperature3) +
  aes(x = emissions, y = avg_temp) +
  geom_point(color = '#0c4c8a', size = 2) +
  geom_abline(intercept = 8.753, slope = 0.00002832, data = temperature3) +
  labs(title = 'Temperature vs. Total CO2 emissions (accounting for 40 years of delayed warming)',
       x = 'Total CO2 emissions (Mt)',
       y = 'Temperature (°C)') +
  theme_minimal() +
  theme(plot.title = element_text(size = 20, face = "bold"),
        axis.text = element_text(size = 13))
grid(nx = 0, ny = NULL)
dev.off()
plot_crop(pdf_name)
openPDF(pdf_name)

# GHG emissions by countries
library(rvest)  # For web scraping
library(dplyr)  # For pipe operator.  
library(Biobase)  # For exporting graphics to pdf.
library(readr)  # For importing dataset.
library(shiny)  # For interactive app.

GHG_emissions <- read_csv("GHG_emissions.csv")
View(GHG_emissions)

# Extracting names of 28 EU Countries.
url <- "https://europa.eu/european-union/about-eu/countries_en"
eu_countries <- read_html(url) %>%
  html_nodes("#year-entry2 a") %>%
  html_text()

# Subsetting EU countries' GHG emissions.
EU_GHG_emissions <- GHG_emissions[GHG_emissions$Country %in% eu_countries, ]
length(unique(EU_GHG_emissions$Country))  # Czechia is not in dataset.

eu_countries[eu_countries %in% EU_GHG_emissions$Country]

Austria_GHG <- EU_GHG_emissions[EU_GHG_emissions$Country %in% "Austria", ]

# Whole data set.
full_dataset <- read_csv("CW_CAIT_GHG_Emissions_31102017.csv")

SG_GHG <- full_dataset[full_dataset$Country == "Singapore", ]
SG_GHG <- SG_GHG[, c(1, 2, 4, 12:17)]
names(SG_GHG) <- gsub(" \\(MtCO2e\\)", "", names(SG_GHG))
names(SG_GHG) <- gsub(" \\(MtCO2\\)", "", names(SG_GHG))

# Find sector with greatest emissions.
for (i in seq_len(nrow(SG_GHG))) {
  print(which.max(SG_GHG[i, 4:8]))
}

# One way of barplot: Creating named vector.
GHG_1990 <- as.numeric(SG_GHG[1, 4:8])
names(GHG_1990) <- names(SG_GHG)[4:8]
barplot(GHG_1990)

# Another way: Coerce subset into matrix.
barplot(as.matrix(SG_GHG[1, 4:8]), col = colours)

# Exporting 2 by 3 visual.
pdf_name <- "barplot_SG_sectors.pdf"
pdf(pdf_name, width = 8, height = 7)

par(mgp = c(2, 0.75, 0),
    mfrow = c(2, 3),
    mar = c(2, 3, 2, 1))

colours <- c("yellow", "lightblue", "orange", "burlywood3", "lightgreen")

for (i in c(seq(1990, 2010, by = 5), 2014)) {
  barplot(as.matrix(SG_GHG[SG_GHG$Year == i, 4:8]),
          col = rainbow(7),
          ylim = c(0, 45),
          ylab = "GHG Emissions (MtCO2e)",
          main = as.character(i))
  
}

grid()

dev.off()
openPDF(pdf_name)

# Plot stacked barplot.
SG_GHG_five_years <- t(as.matrix(SG_GHG[c(1, 6, 11, 16, 21, 25), 4:9]))
colnames(SG_GHG_five_years) <- c(1990, 1995, 2000, 2009, 2010, 2014)

colours <- c("yellow", 
             "lightblue", 
             "orange", 
             "burlywood3", 
             "lightgreen")

color <- c("forestgreen",  # Nicer colours than the default.
           "deeppink3",
           "sandybrown",
           "khaki1",
           "orange",
           "lightblue")

pdf_stackedplot <- "stackedplot_SG.pdf"

# Create stacked plot.
pdf(file = pdf_stackedplot, height = 5, width = 6)

par(mgp = c(2, 0.75, 0),
    bg = "",
    mar = c(1, 3, 2, 1))

barplot(SG_GHG_five_years,
        col = color,
        ylim = c(0, 150),
        ylab = "GHG Emissions (MtCO2e)",
        main = "Singapore's GHG Emissions By Sector",
        beside = TRUE)

legend("topleft",
       legend = c("Energy", "Industrial Processes", "Agriculture",
                  "Waste", "Land use change", "Bunker Fuel"),
       fill = color,
       bg = "ghostwhite",
       title = "Sector",
       title.adj = 0.1)

grid(nx = 0, ny = NULL)

dev.off()
openPDF(pdf_stackedplot)


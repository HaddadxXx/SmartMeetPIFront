import {
    ApexAnnotations,
    ApexAxisChartSeries,
    ApexChart,
    ApexDataLabels,
    ApexFill,
    ApexGrid,
    ApexLegend,
    ApexMarkers,
    ApexNonAxisChartSeries,
    ApexPlotOptions,
    ApexResponsive,
    ApexStroke,
    ApexTheme,
    ApexTitleSubtitle,
    ApexXAxis,
    ApexYAxis,
} from "ng-apexcharts";

export type ChartOptions = {
    series?: ApexAxisChartSeries;
    chart?: ApexChart;
    xaxis?: ApexXAxis;
    stroke?: ApexStroke;
    tooltip?: any;
    dataLabels?: ApexDataLabels;
    hover?: number;
    yaxis?: ApexYAxis;
    legend?: ApexLegend;
    labels?: string[];
    plotOptions?: ApexPlotOptions;
    fill?: ApexFill;
    responsive?: ApexResponsive[];
    pieseries?: ApexNonAxisChartSeries;
    title?: ApexTitleSubtitle;
    theme?: ApexTheme;
    colors?: string[];
    markers?: ApexMarkers;
    annotations?: ApexAnnotations;
    grid?: ApexGrid;
};


export const reviewStatement: ChartOptions | any = {
    series: [44, 55, 13],
    chart: {
        width: 320,
        type: 'pie',
    },
    legend: {
        position: 'bottom'
    },
    plotOptions: {
        legend: {
            position: 'bottom'
        }
    },
    colors: ['#0389c9', '#385cb4', '#fe4653'],
    labels: ['Positive', 'Nagative', 'Natural'],
    responsive: [
        {
            breakpoint: 480,
            options: {
                chart: {
                    width: 200
                },
                legend: {
                    position: 'left'
                }
            },
        },
        {
            breakpoint: 1199,
            options: {
                legend: {
                    position: 'right'
                }
            },
        },
        {
            breakpoint: 1461,
            options: {
                chart: {
                    width: 280
                }
            }
        }]

};

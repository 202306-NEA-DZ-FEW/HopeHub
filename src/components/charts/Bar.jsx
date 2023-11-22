import * as d3 from "d3";
import React, { useEffect } from "react";

function Bar({ data, setSelectedDate }) {
    // console.log('component bar data', data)
    // const data = [12, 5, 6, 6, 9, 10];
    function drawChart() {
        d3.select("#bar").select("svg").remove();
        const svg = d3
            .select("#bar")
            .append("svg")
            .attr("width", 550)
            .attr("height", 400)
            .style("overflow", "visible")
            .style("margin-left", 10);

        const xScale = d3
            .scaleBand() //define x axis
            .domain(data.map((d) => d.date))
            .range([0, 500])
            .padding(0.5);
        const yScale = d3
            .scaleLinear() //define y axis
            .domain([0, d3.max(data, (d) => d.count) + 3])
            .range([350, 80]);

        svg.append("g") //add x axis
            .attr("transform", "translate(0," + 350 + ")")
            .call(d3.axisBottom(xScale).tickFormat((i) => i));

        svg.append("g")
            .attr("id", "yline")
            .call(d3.axisLeft(yScale).ticks(d3.max(data, (d) => d.count)));

        svg.select("#yline")
            .selectAll(".label")
            .data(data)
            .enter()
            .append("text")
            .attr("class", "label")
            .attr("id", (d) => "date" + d.date)
            .text((d) => d.count)
            .attr("x", (d) => xScale(d.date) + xScale.bandwidth() / 2)
            .attr("y", (d) => yScale(d.count) - 5)
            .attr("text-anchor", "middle")
            .attr("fill", "grey");

        svg.selectAll("rect")
            .data(data)
            .enter()
            .append("rect")
            .attr("x", (d) => xScale(d.date))
            .attr("y", (d) => yScale(d.count))
            .attr("width", xScale.bandwidth())
            .attr("height", (d) => 350 - yScale(d.count))
            .attr("fill", "#99B4DF") //
            .attr("rx", 5)
            .attr("ry", 5)
            .on("click", (e, d) => {
                // console.log("dddddd", d, e);
                setSelectedDate(d.date);
                d3.select("#bar").selectAll("rect").attr("fill", "#99B4DF");
                d3.select(e.target).attr("fill", "#ac60ff");
                svg.selectAll(".label").attr("fill", "grey");
                svg.select(`#date${d.date}`).attr("fill", "#ac60ff");
            });

        // svg.select("g").data(data)
        //     .append("text")
        //     .text((d) => d.count)
        //     .attr("x", (d) => xScale(d.date) )
        //     .attr("y", (d) => yScale( d.count) )
        //     .attr("text-anchor", "middle")
        //     .attr("fill", "red");

        // Add x-axis label
        svg.append("text")
            .attr("text-anchor", "end")
            .attr("x", 530)
            .attr("y", 340)
            .attr("fill", "grey")
            .text("Dates");

        // Add y-axis label
        svg.append("text")
            .attr("text-anchor", "end")
            // .attr("transform", "rotate(-90)")
            .attr("y", 80)
            .attr("x", 150)
            .attr("fill", "grey")
            .text("Appointments count");

        svg.append("text")
            .attr("x", 500 / 2)
            .attr("y", 40)
            .attr("text-anchor", "middle")
            .style("font-size", "20px")
            .style("text-decoration", "underline")
            .text("Appointment in the last seven days");
    }

    useEffect(() => {
        drawChart();
    }, []);

    return (
        <div
            id='bar'
            className='border border-NeutralBlack p-4 w-fit col-start-1 col-end-2 row-start-2 h-fit'
        ></div>
    );
}

export default Bar;

function flagFallBack(tag) {
    if(tag.src.indexOf("und.gif", tag.src.length - 7) === -1) {
        tag.src='/assets/flag/und.gif';
        tag.parentNode.appendChild(document.createTextNode(''));
    }
}



// Hard coded name resource types
name_to_type = {
    "agrovoc-skos": "lexicon.generalKB",
    "alpino-rdf": "corpus",
    "apertium-rdf": "lexicon.lexicon",
    "apertium-rdf-ca-it": "lexicon.lexicon",
    "apertium-rdf-en-ca": "lexicon.lexicon",
    "apertium-rdf-en-es": "lexicon.lexicon",
    "apertium-rdf-en-gl": "lexicon.lexicon",
    "apertium-rdf-es-ca": "lexicon.lexicon",
    "apertium-rdf-es-gl": "lexicon.lexicon",
    "apertium-rdf-es-ro": "lexicon.lexicon",
    "apertium-rdf-es-pt": "lexicon.lexicon",
    "apertium-rdf-fr-ca": "lexicon.lexicon",
    "apertium-rdf-fr-es": "lexicon.lexicon",
    "apertium-rdf-pt-ca": "lexicon.lexicon",
    "asjp": "lexicon.lexicon",
    "automated similarity judgment program lexical data": "meta.db",
    "babelnet": "lexicon.lexicon",
    "bible-ontology": "lexicon.generalKB",
    "clean-energy-data-reegle": "lexicon.generalKB",
    "clld-ewave": "meta.typology",
    "clld-afbo": "meta.typology",
    "clld-apics": "meta.typology",
    "clld-glottolog": "meta.typology",
    "clld-phoible": "meta.typology",
    "clld-sails": "meta.typology",
    "clld-wals": "meta.typology",
    "clld-wold": "meta.typology",
    "cornetto": "lexicon.lexicon",
    "dbnary": "lexicon.lexicon",
    "fao-geopolitical-ontology": "lexicon.generalKB",
    "fiesta": "corpus",
    "gemet": "lexicon.generalKB",
    "germlex": "lexicon.lexicon",
    "gesis-thesoz": "lexicon.generalKB",
    "glottolog": "meta.db",
    "gold": "meta.term",
    "gutenberg": "corpus",
    "ids": "lexicon.lexicon",
    "ietflang": "meta.term",
    "intercontinental dictionary series": "lexicon.lexicon",
    "jrc-name": "lexicon.generalKB",
    "jrc-names": "lexicon.generalKB",
    "lexicon": "lexicon.lexicon",
    "lexinfo": "meta.term",
    "lexvo": "meta.term",
    "lingvoj": "meta.term",
    "linked-hypernyms": "lexicon.generalKB",
    "lodac-bdls": "lexicon.generalKB",
    "masc": "corpus",
    "metashare": "meta.db",
    "mexico": "corpus",
    "mlsa": "corpus",
    "muninn-world-war-i": "lexicon.generalKB",
    "olia": "meta.term",
    "olia-discourse": "meta.term",
    "opencyc": "lexicon.generalKB",
    "panlex": "lexicon.lexicon",
    "parole-simple-ont": "lexicon.lexicon",
    "phoible": "meta.typology",
    "pleiades": "lexicon.generalKB",
    "saldo-rdf": "lexicon.lexicon",
    "saldom-rdf": "lexicon.lexicon",
    "simple": "lexicon.lexicon",
    "swefn-rdf": "lexicon.lexicon",
    "the speech accent archive": "corpus",
    "umthes": "lexicon.generalKB",
    "wikilinks-rdf-nif": "corpus",
    "wold": "meta.typology",
    "world atlas of language structuctures": "meta.db",
    "world loanword database": "lexicon.lexicon",
    "xlid-lexica": "lexicon.lexicon",
    "yleinen suomalainen asiasanasto": "lexicon.generalKB",
    "zhishi-me": "lexicon.generalKB",
// New resource Mar 2013
    "apertium-rdf-oc-ca": "lexicon.lexicon",
    "apertium-rdf-eu-es": "lexicon.lexicon",
    "apertium-rdf-pt-gl": "lexicon.lexicon",
    "apertium-rdf-es-ast": "lexicon.lexicon",
    "apertium-rdf-oc-es": "lexicon.lexicon",
    "masc-bn-nif": "corpus",
    "printed-book-auction-catalogues": "corpus",
    "environmental-applications-reference-thesaurus": "lexicon.generalKB",
    "eurovoc-in-skos": "lexicon.generalKB",
    "gemet-annotated": "lexicon.generalKB",
    "apertium-rdf-eo-en": "lexicon.lexicon",
    "apertium-rdf-es-an": "lexicon.lexicon",
    "apertium-rdf-eo-fr": "lexicon.lexicon",
    "apertium-rdf-eo-ca": "lexicon.lexicon",
    "apertium-rdf-eu-en": "lexicon.lexicon",
    "apertium-rdf-eo-es": "lexicon.lexicon",
    "multext-east": "corpus",
    "bll-thesaurus": "lexicon.generalKB
}



/* Set the diagrams Height & Width */
var h = 950, w = 1200;
var defaultVertexSize = 11.0;
var minimumSize = 24.0;
/* Establish/instantiate an SVG container object */
var svg = d3.select("#diagram")
.append("svg")
.attr("height",h)
.attr("width",w);
d3.json("llod-cloud.json", makeDiag);
// build the arrow.
/*
   svg.append("svg:defs").selectAll("marker")
   .data(["end"])
   .enter().append("svg:marker")
   .attr("id", String)
   .attr("viewBox", "0 0 13 10")
   .attr("refX", 9)
   .attr("refY", -5)
   .attr("markerWidth", 6)
   .attr("markerHeight", 6)
   .attr("orient", "auto")
   .append("svg:path")
   .attr("d", "M 0,0 13,5 0,10 z")
   .attr('fill', "#ccc")
   */


function bubbleSize(node) {
    var size = defaultVertexSize;
    if("size" in node) {
        size = defaultVertexSize / 10.0 * Math.log(node["size"] + 1) + defaultVertexSize;
    } else {
        size = minimumSize;
    }
    if(!isNaN(size)) {
        return size;
    } else {
        return minimumSize;
    }
}

function arrowWidth(node) {
    var width = Math.log(node["weight"]) / 2 - 1;
    if(!isNaN(width)) {
        return width;
    } else {
        return 1;
    }
}

function bubbleType(node) {
    var type = "unknown";
    if("tags" in node) {
        type = "meta";
    }

    var name_plus_tags = "";
    if("name" in node) {
        name_plus_tags = node["name"];
    }
    name_plus_tags=name_plus_tags+" [";

    if("tags" in node) {
        for(i in node["tags"]) {
            name_plus_tags = name_plus_tags+" \""+ node["tags"][i] +"\"";
        }
    }
    name_plus_tags = name_plus_tags+" ]";
    name_plus_tags = name_plus_tags.toLowerCase();

    if(name_plus_tags.indexOf('lexicon') > 0) {
        type="lexicon.lexicon";
    }
    if(name_plus_tags.indexOf('lexical-resources') > 0) {
        type="lexicon.lexicon";
    }

    if(name_plus_tags.indexOf("typology")!=-1) {
        type="meta.db";
    }
    if("name" in node) { 
        if(node["key"].toLowerCase().indexOf("dbpedia")!=-1) { type="lexicon.generalKB"; }
        if(node["key"].toLowerCase().indexOf("ontos")!=-1) { type="lexicon.generalKB"; }
        if(node["key"].toLowerCase().indexOf("asit")!=-1) { type="lexicon.generalKB"; }
        if(node["key"].toLowerCase().indexOf("heart failure")!=-1) { type="lexicon.generalKB"; }
        if(node["key"].toLowerCase().indexOf("zhishi.me")!=-1) { type="lexicon.generalKB"; }
    }
    if(name_plus_tags.indexOf("dbpedia")!=-1) { type="lexicon.generalKB"; }
    if(name_plus_tags.indexOf("yago")!=-1) { type="lexicon.generalKB"; }
    if(name_plus_tags.indexOf("thesaurus")!=-1) { type="lexicon.generalKB"; }
    if(name_plus_tags.indexOf("vocab-mappings")!=-1) { type="lexicon.generalKB"; }
    if(name_plus_tags.indexOf("wiktionary")!=-1) { type="lexicon.lexicon"; }
    if(name_plus_tags.indexOf("sentiment")!=-1) { type="lexicon.lexicon"; }
    if(name_plus_tags.indexOf("lemon")!=-1) { type="lexicon.lexicon"; }
    if(name_plus_tags.indexOf("isocat")!=-1) { type="meta.term" ; }
    if(name_plus_tags.indexOf("biblio")!=-1) { type="meta.other"; }
    if(name_plus_tags.indexOf("general ontology of linguistic description")!=-1) { type="meta.term"; }
    if(name_plus_tags.indexOf("corpus")!=-1) { type="corpus"; }
    if(name_plus_tags.indexOf("treebank")!=-1) { type="corpus"; }
    if(name_plus_tags.indexOf("corpora")!=-1) { type="corpus"; }
    if(name_plus_tags.indexOf("semanticquran")!=-1) { type="corpus"; }
    if(name_plus_tags.indexOf("wordnet")!=-1) { type="lexicon.lexicon"; }
    for(name2 in name_to_type) {
        if(node["key"] == name2) {
            type = name_to_type[name2];
        }
    }
    return type;

}

function bubbleColor(type) {
    // html color codes: http://html-color-codes.info/
    if(colorMap[type])
        return colorMap[type]
    else
        return '#777';
}


function breakText(text) {
    if(text.length > 10) {
        var i = text.indexOf(" ", 10);
        if(i > 0) {
            var test = breakText(text.substring(i+1));
            test.unshift(text.substring(0,i));
            return test;
        } else {
            return [text];
        }
    } else {
        return [text];
    }
}

function makeDiag(json) {
    var nodes = [];
    var node_names = [];
    for(var key in json) {
        var license = json[key].license || "none";
        if("triples" in json[key]) {
            nodes.push({
                "name": breakText(json[key]["name"]),
                "lines": breakText(json[key]["name"]).length,
                "key": key,
                "size": json[key]["triples"],
                "license": license,
                "url": "http://linghub.lider-project.eu/datahub/" + key,
                "tags": json[key]["tags"]
            });
        } else {
            nodes.push({
                "name": breakText(json[key]["name"]),
                "lines": breakText(json[key]["name"]).length,
                "license": license,
                "url": "http://linghub.lider-project.eu/datahub/" + key,
                "key": key,
                "tags": json[key]["tags"]
            });
        }
        node_names.push(key);
    }

    var links = [];
    for(var key in json) {
        for(var target in json[key]["links"]) {
            if(node_names.indexOf(target) >= 0) {
                links.push({
                    "source": node_names.indexOf(key),
                    "lines": breakText(json[key]["name"]).length,
                    "target": node_names.indexOf(target),
                    "weight": json[key]["links"][target]
                });
            }
        }
    }


    /* Draw the edges/links between the nodes */
    var edges = svg.selectAll("line")
        .data(links)
        .enter()
        .append("line")
        .style("stroke", "#ccc")
        .style("stroke-width", arrowWidth)
        .attr("marker-end", "url(#end)");


    /* Draw the node labels first */
    var bubbles = svg.selectAll(".node")
        .data(nodes)
        .enter().append("g")
        .attr("class", "node");
    bubbles.append("title")
        .text(function(d) { return d["name"]; });
    bubbles.append("circle")
        .attr("cursor", "pointer")
        .attr("r", bubbleSize)
        .attr("stroke", "rgb(94, 94, 94)")
        .on("click", function(d) { window.open(d["url"],"_blank"); })
        .attr('type', bubbleType)
        .attr('license', function(d) { return d.license })
        /*
           .attr("fill", function(d) { 
           var type = bubbleType(d);
           return bubbleColor(type); 
           });
           */
        bubbles.append("text")
        .style("text-anchor", "middle")
        .attr("font-family", "sans-serif")
        .attr("font-size", "12px")
        .on("click", function(d) { window.open(d["url"],"_blank"); })
        .attr("y", function(d) { return (d["lines"] * -0.7 + 0.0) + "em"; })
        .attr("cursor", "pointer")
        .selectAll("text")
        .data(function(d, i) { return d["name"] })
        .enter().append("tspan")
        .attr("x", "0")
        .attr("dy", "1.2em")
        .text(function(d) { return d.toString(); });
    /* Establish the dynamic force behavor of the nodes */
    var force = d3.layout.force()
        .nodes(nodes)
        .links(links)
        .size([w,h])
        .linkDistance([2 * defaultVertexSize])
        .charge([-12000])
        .gravity(5.0)
        .start();
    /* Run the Force effect */
    force.on("tick", function() {
        bubbles.attr("transform", function(d) {
            var r = bubbleSize(d);
            d.x = Math.max(r, Math.min(w-r, d.x));
            d.y = Math.max(r, Math.min(h-r, d.y));
            return "translate(" + d.x + "," + d.y + ")";

        });
        edges.attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });
    }); // End tick func
    var k = 0;
    while ((force.alpha() > 1e-5) && (k < 500)) {
        force.tick(),
            k = k + 1;
    }

    // luca wrote stuff after this
    // i modify the SVG after it's been drawn

    $('svg g.node text').each(function() {
        var $this = $(this)
        var $circle = $this.parent().find('circle')
        circleWidth = $circle.attr('r') * 2;
    // make smaller until it fits
    for(var i=10; i > 0; i--) {
        var box = $this.get(0).getBoundingClientRect();
        var width = box.right-box.left;
        if(width > circleWidth) {
            $this.attr('font-size', i+'px')
        $this.attr('y', $this.attr('y'));
        } else {
            continue;
        }
    }

    })
    $('select.legend').on('change', function() {
        var $this = $(this)
        var selected = $this.find('option:selected').attr('name')
        if(selected == 'type') {
            redrawLegend('type')
        } else if (selected == 'license') {
            redrawLegend('license')

        }
    });

    var typeColor = {
        "meta":'#FDAE6B',
        "meta.db":'#F08080',
        "meta.term":'#FD8C3B',
        "meta.typology":'#E6550D',
        "lexicon":'#74C476',
        "lexicon.generalKB":'#A1D99B',
        "lexicon.lexicon":'#31A354',
        "corpus":'#3182BD'
    }
    var licenseColor = {
        "none": "#ddd",
        "http://www.opendefinition.org/licenses/cc-by-sa": "#3FE0AD",
        "http://creativecommons.org/licenses/by-nc/2.0/": "#A9A9A9",
        "http://www.opendefinition.org/licenses/gfdl": "#7BF8D6",
        "http://www.opendefinition.org/licenses/cc-by": "#9EB291",
        "http://www.opendefinition.org/licenses/odc-by": "#F3DAC1",
        "http://reference.data.gov.uk/id/open-government-licence": "#B0ECD1",
        "http://www.opendefinition.org/licenses/cc-zero": "#F2DD5A",
        "http://www.opendefinition.org/licenses/odc-odbl": "#DFEFC2",
        "public-domain": "#98FB98",
        "attribution": "#00FF7F",
        "nc": "#ee82ee",
        "closed": "#ff6347",
        "open": "#98FB98",
        "http://www.opendefinition.org/licenses/cc-nc": "#ee82ee",
        "http://www.opendefinition.org/licenses/odc-pddl": "#9acd32"
    }
    var typeText = {
        "meta":'Other Metadata',
        "meta.db":'Linguistic Resource Metadata',
        "meta.term":'Linguistic Data Categories',
        "meta.typology":'Typological Databases',
        "lexicon":'Other Lexical Resources',
        "lexicon.generalKB":'Terminologies, Thesauri and Knowledge Bases',
        "lexicon.lexicon":'Lexicons and Dictionaries',
        "corpus":'Corpora'
    }
    var licenseText = {
        "none": "None",
        "http://creativecommons.org/licenses/by-nc/2.0/": "CC-BY",
        "http://www.opendefinition.org/licenses/cc-by-sa": "CC-BY-SA",
        "http://www.opendefinition.org/licenses/gfdl": "GNU Free Documentation License",
        "http://www.opendefinition.org/licenses/cc-by": "CC-BY",
        "http://www.opendefinition.org/licenses/odc-by": "Open Data Commons",
        "http://reference.data.gov.uk/id/open-government-licence": "Open Government License",
        "http://www.opendefinition.org/licenses/cc-zero": "CC-Zero",
        "http://www.opendefinition.org/licenses/odc-odbl": "Open Database License",
        "public-domain": "Other (Public Domain)",
        "attribution": "Other (Attribution)",
        "nc": "Other (Non-commerical)",
        "closed": "Closed",
        "open": "Open",
        "http://www.opendefinition.org/licenses/cc-nc": "CC-NC",
        "http://www.opendefinition.org/licenses/odc-pddl": "Public Domain Dedication and License"
    }
    var typeOrdered = [
        "corpus", "lexicon.generalKB", "lexicon.lexicon", 
        "meta.db", "meta.term", "meta.typology" ];
    var licenseOrdered = [
        "http://www.opendefinition.org/licenses/cc-zero",
        "public-domain",
        "open",
        "http://www.opendefinition.org/licenses/cc-by",
        "http://www.opendefinition.org/licenses/cc-by-sa",
        "http://www.opendefinition.org/licenses/odc-by",
        "http://www.opendefinition.org/licenses/gfdl",
        "http://www.opendefinition.org/licenses/odc-odbl",
        "http://reference.data.gov.uk/id/open-government-licence",
        "http://www.opendefinition.org/licenses/odc-pddl",
        "attribution",
        "http://www.opendefinition.org/licenses/cc-nc",
        "nc",
        "closed",
        "none" ]


    function redrawLegend(key) {
        if(key == 'type') {
            colorMap = typeColor;
            textMap = typeText;
            order = typeOrdered;
            
        } else if (key == 'license') {
            colorMap = licenseColor;
            textMap = licenseText;
            order = licenseOrdered;
        }
        // remove all legend nodes
        $("g[legend_node=true]").remove()
            // build legend in SVG
            var colors = {}
        $('svg g circle').each(function() {
            var $this = $(this);
            // JPM: Make bubbles grey if not found
            if(colorMap[$this.attr(key)]) {
                colors[$this.attr(key)] = colorMap[$this.attr(key)]
                $this.attr('fill', colorMap[$this.attr(key)])
            } else {
                $this.attr('fill', '#ddd');
            }
        })

        var count = 0;
        for(var j in order) {
            var i = order[j];
            count++;
            var gnode = svg.append("g")
                .attr("transform", "translate(3, "+(count * 15)+")")
                .attr("legend_node", true)

                gnode.append("circle")
                .attr('r', 4)
                .attr("cx", "0.5em")
                .attr('fill',colors[i])

                gnode.append("text")
                .attr('style','font-size: 9px;')
                .attr("dx", "2em")
                .attr("dy", "0.3em")
                .text(function(d) { return textMap[i] || i});
        }

    }
    redrawLegend('type')

    // add legend bottom stuff
    var gnode = svg.append("g")
        .attr("transform", "translate(0, 880)")

    gnode.append("text")
        .attr('style','font-size: 13px;')
        /*
        .attr("dx", "0em")
        .attr("dy", "0.3em")
        */
        .text(function(d) { return 'The LLOD diagram is maintained'});
    gnode.append("text")
        .attr('style','font-size: 13px;')
        .attr("dy", "1.5em")
        .text(function(d) { return 'by the OKFN Working Group on Linguistics'});
    gnode.append("text")
        .attr('style','font-size: 13px;')
        .attr("dy", "3em")
        .text(function(d) { return 'and provided under the'});

    gnode.append("text")
        .attr('style','font-size: 13px;')
        .attr("dy", "4.5em")
        .text(function(d) { return ' Creative Commons Attribution 3.0 Unported (CC BY 3.0) license'});

    svg.append("image")
        .attr("width", "88")
        .attr("height", "31")
        //.attr("xlink:href", "http://mirrors.creativecommons.org/presskit/buttons/88x31/svg/by.svg")
        .attr("transform", "translate(1020, 910)"); // Magic numbers that work... I hope

    $('svg').attr('viewBox', '0 0 1417 778')
    $('svg').attr('style', 'position: relative;')
    $('svg').attr('xmlns', 'http://www.w3.org/2000/svg')


}
$(function() {
    $('.export_svg').click(function() {
        open("data:image/svg+xml," + encodeURIComponent($('svg').get(0).outerHTML));
    })
})



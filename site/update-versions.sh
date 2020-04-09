#!/bin/bash
# update llod-cloud-versions.html from http://lod-cloud.net/versions/
versions=`
	echo http://lod-cloud.net/versions/latest/;
	wget http://lod-cloud.net/versions/ -O - 2>/dev/null | \
	xmllint --recover --format --html - | \
	sed s/'[ >]'/'\n'/g |\
	grep '^href="/versions/' | \
	sed s/'.*"\([^"]*\)".*'/'\1'/ | \
	egrep '/(2019|20[2-9][0-9])' | \
	sed s/'^'/'http:\/\/lod-cloud.net'/;`
	# 	we only work with 2019+ dumps, the older ones have naming and other issues and are covered anyway
for version in $versions; do
	version=${version}linguistic-lod.svg
	if egrep -m 1 '="'$version'"' llod-cloud-versions.html >&/dev/null; then 
		echo $version found, skipping 1>&2;
	else
		if wget --spider $version >&/dev/null; then			
			echo add $version to llod-cloud-versions.html 1>&2;
			month=`echo $version | 
				sed -e s/'.*\/2[0-9][0-9][0-9]-\([0-9][0-9]*\)-[0-9].*'/'\1'/ \
					-e s/'^0*'// \
					-e s/12/December/ \
					-e s/11/November/ \
					-e s/10/October/ \
					-e s/9/September/ \
					-e s/8/August/ \
					-e s/7/July/ \
					-e s/6/June/ \
					-e s/5/May/ \
					-e s/4/April/ \
					-e s/3/March/ \
					-e s/2/February/ \
					-e s/1/January/`; 
			date=$month' '`echo $version | sed s/'.*\/\(2[0-9][0-9][0-9]\).*'/'\1'/g`
			if echo $version | grep '/latest'/ >&/dev/null; then
				date=latest
			fi;
			echo "<li><a href=\""$version"\">"$date"</a></li>
				  $(cat  llod-cloud-versions.html)" >  llod-cloud-versions.html;
		else
			echo did not find $version, but the directory exists, check file formats and LOD category labels 1>&2;
		fi;		
	fi;
	
	echo "<li><a href=\"http://lod-cloud.net/versions/latest/linguistic-lod.svg\">latest</a></li>
		$(cat llod-cloud-versions.html | grep -v '/latest')" >  llod-cloud-versions.html

		
	# #<li><a href="http://lod-cloud.net/versions/2018-28-06/linguistic-lod.svg">June 2018</a></li>
	# echo $version;
done;

# http://lod-cloud.net/versions/2018-28-06/linguistic-lod.svg

# linguistic-lod.json
# linguistic-lod.png
# linguistic-lod.svg 

#/versions/2007-05-01

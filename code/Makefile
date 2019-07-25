########################################################################
# Makefile for Linux

CXXFLAGS = -I. -g -Iglsdk/glm -Iglsdk/glimg/include -Iglsdk/freeglut/include -Iglsdk/glload/include -Iglsdk -I/usr/X11R6/include/GL/ -I/usr/include/GL/ -DBOOST_ALL_NO_LIB
LIBS =  -L/usr/local/lib -lAntTweakBar -lfreeglut -lX11 -lGLU -L/usr/lib/ -lGL -L/usr/X11R6/lib -Lglsdk/glimg/lib/ -Lglsdk/glload/lib/ -Lglsdk/freeglut/lib/ -lglload -lglimg
target = framework.exe

src1 = framework.cpp models.cpp scene.cpp shader.cpp fbo.cpp
src2 = rply.c
headers = scene.h shader.h fbo.h models.h rply.h AntTweakBar.h
extras = framework.vcxproj Makefile glsdk AntTweakBar.dll AntTweakBar.lib ChippedRedBricks-ColorMap.png bunny.ply
shaders = lighting.frag lighting.vert

pkgFiles = $(src1) $(src2) $(shaders) $(headers) $(extras)

objects = $(patsubst %.cpp,%.o,$(src1)) $(patsubst %.c,%.o,$(src2)) 

$(target): $(objects)
	@echo Link $(target)
	g++ -g  -o $@  $(objects) $(LIBS)

%.o: %.cpp
	@echo Compile $<
	@$(CXX) -c $(CXXFLAGS) $< -o $@

%.o: %.c
	@echo Compile $<
	@$(CC) -c $(CXXFLAGS) $< -o $@

run: $(target)
	./$(target)

zip562: $(pkgFiles)
	rm -rf ../CS562-framework ../CS562-framework.zip
	mkdir ../CS562-framework
	cp -r $(pkgFiles) ../CS562-framework
	cd ..;  zip -r CS562-framework.zip CS562-framework; rm -rf CS562-framework

zip541: $(pkgFiles)
	rm -rf ../CS541-framework ../CS541-framework.zip
	mkdir ../CS541-framework
	cp -r $(pkgFiles) ../CS541-framework
	cd ..;  zip -r CS541-framework.zip CS541-framework; rm -rf CS541-framework

clean:
	rm -f *.o *~ $(target) dependicies

ws:
	unix2dos $(src1) $(src2) $(shaders) $(headers) $(extras)
	@echo
	@echo ========= TABS:
	@grep -P '\t' $(src1) $(src2) $(shaders) $(headers) $(extras)

dependicies: 
	g++ -MM $(CXXFLAGS)  $(src1) > dependicies

include dependicies

var terminal_history = 'mkdir another\n\
cd another/\n\
module load iraf/x86_64/gnu/2.16\n\
cl\n\
ls\n\
rm -rf *\n\
mkiraf\n\
ls\n\
cl\n\
ls\n\
cd ..\n\
ls\n\
cl\n\
ls\n\
mkdir one_more\n\
cl\n\
ls\n\
cd one_more/\n\
ls\n\
cl\n\
ls\n\
cd ..\n\
cl\n\
ls\n\
cd one_more/\n\
l\n\
ls\n\
rm -rf *\n\
ls\n\
mkiraf\n\
cl\n\
g2\n\
ssh root@g2\n\
g2\n\
ssh root@g2\n\
g2\n\
ssh root@g2\n\
ssh root@g2\n\
cd iraf/\n\
ls\n\
cd new/\n\
ls\n\
module load iraf/x86_64/gnu/2.16\n\
cl\n\
ls\n\
cd iraf/\n\
ls\n\
mkdir test\n\
cd test\n\
module avail iraf\n\
module load iraf/i686/gnu/2.16\n\
ls\n\
cl\n\
which cl\n\
mkiraf\n\
ls\n\
cl\n\
ls\n\
cd ..\n\
ls\n\
cd new/\n\
ls\n\
cp input.fits ../test/\n\
cd ..\n\
cd test\n\
ls\n\
cl\n\
cd iraf/test\n\
ls\n\
module load iraf/i686/gnu/2.16\n\
cl\n\
ls\n\
cl\n\
ssh root@g2\n\
module load mpb/x86_64/gnu/1.5-fftw-3.3.3\n\
which mpb\n\
module load mpb/x86_64/gnu/1.5\n\
which mpb\n\
mpb\n\
module load iraf/i686/gnu/2.16\n\
ls\n\
cd iraf/\n\
ls\n\
cd test\n\
ls\n\
cl\n\
lc\n\
cl\n\
ls /tmp/\n\
cl\n\
cd\n\
cd /lustre/projects/p014_swin/\n\
ls\n\
cd programs/\n\
ls\n\
cd src/\n\
ls\n\
cd new/\n\
ls\n\
emacs -nw deploy_production2.sh \n\
ls\n\
emacs -nw deploy.sh\n\
ls\n\
cd taosm\n\
ls\n\
git status\n\
git diff src/base/rdb_backend.hh\n\
git status\n\
git diff usescript.py \n\
git branch\n\
git checkout kdtree\n\
ls -al\n\
ls\n\
ssh tao01\n\
ssh TAODBAdmin@tao01\n\
cd workspace/taosm\n\
git status\n\
git checkout kdtree\n\
ls\n\
ssh tao01\n\
cd workspace/taosm\n\
ls\n\
git branch\n\
cd ..\n\
source environ-opt.sh \n\
cd taosm\n\
ls\n\
./use\n\
s\n\
ls\n\
cd jobs/\n\
ls\n\
cp /lustre/projects/p014_swin/FTP/devjobs/luke/873/log/params0.xml .\n\
eamcs params0.xml\n\
emacs params0.xml\n\
ls\n\
../build/debug/bin/tao params0.xml database.xml \n\
gdb --args ../build/debug/bin/tao params0.xml database.xml \n\
ls\n\
emacs -nw params0.xml\n\
ls\n\
gdb --args ../build/debug/bin/tao params0.xml database.xml \n\
ls\n\
rm *~\n\
ls\n\
cd. .\n\
cd ..\n\
ls\n\
ssh TAODBAdmin@tao01\n\
ssh tao01\n\
cd /home/npastore\n\
ls\n\
ls .ssh/\n\
cd .ssh/\n\
cd\n\
ssh root@g2\n\
g2\n\
ssh root@g2\n\
ls\n\
cd iraf/new/\n\
ls\n\
module load iraf/i686/gnu/2.16\n\
cl\n\
cd ..\n\
ls\n\
cd test\n\
ls\n\
cl\n\
ls\n\
cl\n\
cd /tmp/\n\
ls -a\n\
ls -l\n\
popd\n\
cd\n\
cd iraf/\n\
ls\n\
cd test\n\
ls\n\
cl\n\
quota\n\
ssh root@g2\n\
ssh root@g2\n\
ipathstats\n\
ipathstats | grep ctx\n\
ipathstats | grep -i ctx\n\
top\n\
ipathstats | grep -i ctx\n\
ipathstats\n\
ipathstats | grep -i ctx\n\
module avail openmpi\n\
cd /var/spool/torque/\n\
ls\n\
cd mom_logs/\n\
ls\n\
cd ../mom_priv/\n\
ls\n\
cd ..\n\
ls\n\
cd job_logs\n\
ls\n\
emacs -n 20150519 \n\
emacs 20150519 \n\
ssh gstar048\n\
ssh gstar048\n\
ssh pbs.g2.swin.edu.au\n\
ssh pbs.swin.edu.au\n\
ssh pbs.hpc.swin.edu.au\n\
cd /var/spool/torque/job_logs\n\
ls\n\
emacs 20150519\n\
emacs 20150518\n\
emacs 20150517\n\
ls\n\
cd ..\n\
ls\n\
cd spool/\n\
ls\n\
cd ..\n\
ls\n\
showjobs\n\
qstat -f | grep gstar048\n\
qstat -f > log\n\
emacs log\n\
module load jre\n\
which java\n\
java\n\
module load trimmomatic\n\
echo $PATH\n\
ls /usr/local/trimmomatic-0.33/\n\
cd /lustre/projects/p014_swin/FTP/devjobs/luke/879\n\
ls\n\
cd log\n\
ls\n\
emacs params0.xml \n\
cd\n\
ssh tao01\n\
ssh root@g2\n\
qsub -I -l walltime=00:24:00\n\
qsub -I -l walltime=24:00:00\n\
ssh root@g2\n\
ssh root@g2\n\
ssh root@g2\n\
module load pandaseq\n\
module avail\n\
ssh root@g2\n\
module load pandaseq\n\
echo $path\n\
echo $PATH\n\
ls /usr/local/x86_64/gnu/pandaseq/bin/\n\
ssh root@g2\n\
module load iraf/i686/gnu/2.16\n\
cd iraf/\n\
ls\n\
cd test\n\
ls\n\
cl\n\
ls\n\
cp $IRAF_DIR/iraf/extern/stsdasbc .\n\
cp -r $IRAF_DIR/iraf/extern/stsdasbc .\n\
ls\n\
rm -rf stsdasbc\n\
cp -r $IRAF_DIR/iraf/extern/stsdasbc .\n\
ls\n\
cd stsbasbc\n\
cd stsdasbc/\n\
ls\n\
source $IRAF_DIR/environ.sh\n\
ls\n\
export stsdasbc=`pwd`/\n\
mkpkg -p stsdasbc\n\
mkpkg -p stsdasbc >& spool\n\
emacs spool \n\
ls binn\n\
ls bin\n\
ls\n\
cd ..\n\
ls\n\
emacs login.cl \n\
ls\n\
cl\n\
ls\n\
emacs -nw login.cl\n\
ls\n\
cl\n\
ls\n\
fg\n\
emacs login.cl\n\
cl\n\
ls\n\
emacs login.cl\n\
cl\n\
ls\n\
cd stsdasbc\n\
ls\n\
find . -iname *.[oa]\n\
find . -iname *.[oa] | xargs rm\n\
cd bin\n\
rm *\n\
cd ..\n\
ls\n\
cd ..\n\
tar czf stsdasbc.tgz stsdasbc/\n\
ls\n\
mv stsdasbc.tgz ~/\n\
cd\n\
ls\n\
mkdir public\n\
ls -al\n\
ls -l public\n\
ls -l\n\
cd public/\n\
ls -l\n\
ls -al\n\
mv ../stsdasbc.tgz .\n\
ls\n\
ssh root@g2\n\
cd\n\
cd public/\n\
ls\n\
tar xzf stsdasbc.tgz \n\
cd stsdasbc\n\
module load iraf/i686/gnu/2.16\n\
source $IRAF_DIR/environsh\n\
source $IRAF_DIR/environ.sh\n\
export stsdasbc=`pwd`/\n\
mkpkg -p stsdasbc\n\
ls bin\n\
ls\n\
cd ..\n\
ls\n\
rm -rf stsdasbc\n\
g2\n\
ls\n\
ssh root@g2\n\
logout\n\
module load esoreflex\n\
which esoreflex\n\
module load esoreflex\n\
module list\n\
esoreflex\n\
emacs /usr/local/esoreflex-2.6/esoreflex-2.6/build-area/install-path.txt\n\
esoreflex\n\
module load esoreflex\n\
esoreflexd\n\
esoreflex\n\
ls\n\
rm *~\n\
ls\n\
rm sub.cl \n\
rm test.cl\n\
ls\n\
rm spec2d.diff \n\
ls\n\
cat qsub.timer \n\
ls\n\
`date` - `date`\n\
eval `date` - `date`\n\
eval `date` - `date`\n\
cd workspace/taosm\n\
cd /lustre/projects/p014_swin/FTP/stagingjobs/jebaldwin/873/\n\
ls\n\
cd log/\n\
ls\n\
emacs params0.xml \n\
ls\n\
emacs stao_jeba_2731.o2844999 \n\
emacs stao_jeba_2731.e2844999 \n\
ls\n\
emacs debug.log.000000 \n\
ls\n\
cd ..\n\
cd. ./874\n\
ls\n\
cd ../874\n\
ls\n\
cd output/\n\
ls\n\
ls -al\n\
cd ..\n\
ls\n\
cd output/\n\
ls\n\
cd ..\n\
ls\n\
ls -al\n\
cd log/\n\
ls\n\
cd. .\n\
cd ../output/\n\
ls\n\
emacs -nw params.xml \n\
ls\n\
emacs image_errors.txt \n\
ls\n\
cd ..\n\
ls\n\
cd log\n\
ls\n\
emacs debug.log.000000 \n\
ls\n\
cd ..\n\
cd devjobs/\n\
ls\n\
cd luke/\n\
ls\n\
cd 883/\n\
ls\n\
cd output/\n\
ls\n\
ls -al\n\
cd workspace/\n\
ls\n\
cd taosm\n\
git branch\n\
cd jobs/\n\
ls\n\
cp /lustre/projects/p014_swin/FTP/stagingjobs/jebaldwin/874/log/params0.xml .\n\
emacs params0.xml \n\
ls\n\
../build/debug/bin/tao params0.xml database.xml \n\
pushd ../..\n\
source environ-opt.sh \n\
popd\n\
../build/debug/bin/tao params0.xml database.xml \n\
cd ..\n\
git status\n\
git checkout work\n\
cd sub/libhpc/\n\
git pull\n\
cd ..\n\
rm -rf build/\n\
./use\n\
emacs src/base/rdb_backend.hh \n\
./use\n\
ls\n\
git branch\n\
ls\n\
emacs -nw uses\n\
emacs usescript.py \n\
./use\n\
ls\n\
cd jobs/\n\
ls\n\
../build/debug/bin/tao params0.xml database.xml \n\
emacs database.xml \n\
cd ..\n\
ls\n\
rm kdt.mags.log \n\
ls\n\
rm sql.mags.log \n\
ls\n\
emacs -nw src/base/rdb_backend.hh \n\
ls\n\
./use\n\
fg\n\
emacs -nw src/base/rdb_backend.hh \n\
./use \n\
cd jobs/\n\
../build/debug/bin/tao params0.xml database.xml \n\
fg\n\
./sue\n\
cd ..\n\
./use\n\
cd jobs\n\
../build/debug/bin/tao params0.xml database.xml \n\
git status\n\
cd ..\n\
git status\n\
git commit src/base/rdb_backend.hh src/base/soci_base_backend.hh \n\
git checkout usescript.py \n\
git status\n\
git checkout kdtree\n\
ls\n\
fg\n\
emacs -nw src/base/rdb_backend.hh \n\
emacs src/base/rdb_backend/rdb_backend.hh \n\
./use\n\
cd jobs/\n\
../build/debug/bin/tao params0.xml database.xml \n\
git status\n\
git commit -a\n\
git status .\n\
git push\n\
git pull\n\
git status\n\
git push\n\
git status\n\
ssh tao01\n\
cd /lustre/projects/p014_swin/programs/src/\n\
cd new/\n\
ls\n\
emacs deploy\n\
emacs deploy.sh\n\
ssh taoadmin@asv1\n\
kpsql -h localhost -p 3306 -U taoadmin lu_uds\n\
ssh TAODBAdmin@tao01\n\
ls\n\
cd\n\
ls\n\
rm masterdb*\n\
ls\n\
rm htaccess \n\
rm fuzzy.par sky.*\n\
ls\n\
rm django_rules-20150309.json \n\
ls\n\
rm *~\n\
ls\n\
rm test_rc.sh \n\
ls\n\
rm log\n\
ls\n\
head forms.py \n\
rm forms.py \n\
ls\n\
rm modules.db \n\
ls\n\
rm output.scruz \n\
ls\n\
rm ellie.tgz \n\
ls\n\
ls -al\n\
ls\n\
qsub -I -l walltime=24:00:00\n\
time qsub -I -l walltime=24:00:00\n\
ls\n\
emacs timer.sh\n\
chmod u+x timer.sh \n\
./timer.sh \n\
fg\n\
emacs timer.sh \n\
sleep 1\n\
fg\n\
./timer.sh\n\
fg\n\
./timer.sh\n\
fg\n\
./timer.sh\n\
ls\n\
time qsub -I -l walltime=24:00:00\n\
./timer.sh > qsub.timer\n\
ls\n\
cd /lustre/projects/p014_swin/\n\
ls\n\
cd FTP/devjobs/Amr/895\n\
ls\n\
cd output/\n\
ls\n\
emacs params.xml \n\
cd ..\n\
cd\n\
ssh lhodkins@asv1\n\
ssh taoadmin@asv1\n\
module avail hdf5\n\
cd /usr/local/x86_64/gnu/\n\
find . -iname libhdf5.so.6\n\
ls hdf5-1.8.12/lib/\n\
ls\n\
find . -iname libhdf5.so.6\n\
module avail hdf5\n\
ssh root@g2\n\
module load python\n\
python\n\
cd workspace/o\n\
cd workspace/\n\
ls\n\
cd sage\n\
ls\n\
find . -iname sage_to_hdf*\n\
module load python\n\
print_qiime_config.py -t\n\
module load python\n\
print_qiime_config.py -t\n\
ssh root@g2\n\
ls\n\
module load python\n\
print_qiime_config.py -t\n\
echo $PYTHON_DIR\n\
ssh root@g2\n\
python\n\
ssh root@g2\n\
cd /projects/p014_swin/\n\
ls\n\
cd tmp/\n\
ls\n\
cd ..\n\
rm -rf tmp\n\
ls\n\
ls -al\n\
cd SSPs/\n\
ls\n\
ls -al\n\
cd ..\n\
ls\n\
ls -al\n\
ls stellar_populations/\n\
cd /var/spool/torque/job_logs\n\
ls\n\
emacs 20150528\n\
ssh pbs.hpc.swin.edu.au\n\
ls\n\
cd /lustre/projects/p014_swin/FTP/\n\
ls\n\
cd jobs\n\
ls\n\
cd chiaratonini/\n\
ls\n\
cd 879/\n\
cd ..\n\
ls -al\n\
cd 879\n\
ls\n\
cd output/\n\
ls\n\
cd ../log/\n\
ls\n\
cd ../output/\n\
ls\n\
emacs params.xml \n\
emacs -nw params.xml \n\
cd workspace/\n\
ls\n\
cd taosm\n\
ls\n\
git status\n\
git pull\n\
ls\n\
emacs usescript.py \n\
ls\n\
./use -j 4\n\
ls\n\
source ../environ-opt.sh \n\
./use -j 4\n\
emacs -nw src/base/rdb_backend/rdb_backend.hh \n\
./use -j 4\n\
cd ../sage\n\
git branc\n\
git branch\n\
git remote\n\
git remote -v\n\
git status\n\
cd ..\n\
git clone http://github.com/darrencroton/sage sage-public\n\
git clone https://github.com/darrencroton/sage sage-public\n\
sl\n\
ls\n\
cd sage-public/\n\
ls\n\
emacs Makefile \n\
ls\n\
source ../environ-opt.sh \n\
echo $GSL_DIR\n\
ls\n\
make\n\
ls\n\
mkdir data\n\
cd data/\n\
ln -s /lustre/projects/p014_swin/raw_data/millennium/mini/treedata/ mini\n\
ls\n\
cp ../input/millennium.par mini.par\n\
ls\n\
emacs mini\n\
emacs mini.par \n\
ls\n\
mkdir tmp\n\
mv mini tmp/\n\
mv mini.par tmp/\n\
rm *~\n\
ls\n\
mv tmp mini\n\
cd mini/\n\
ls\n\
mv mini treedata\n\
ls\n\
emacs mini.par \n\
ls\n\
fg\n\
ls\n\
rm *~\n\
ls\n\
mv mini.par millennium.par\n\
ls\n\
emacs millennium.par \n\
ln -s /lustre/projects/p014_swin/raw_data/millennium/mini/millennium.a_list .\n\
ls\n\
mkdir output\n\
ls\n\
ln -s ../../sage .\n\
ls\n\
./sage millennium.par \n\
ln -s ../../extra .\n\
ls\n\
ls output/\n\
./sage millennium.par \n\
ls\n\
ls output/\n\
cd ..\n\
ls\n\
cd mini/\n\
ls\n\
ln -s /home/lhodkins/workspace/taosm/build/debug/bin/sage2h5 .\n\
ls\n\
./sage2h5 -h\n\
./sage2h5 -s ./output -p millennium.par -a millennium.a_list -o mini-millennium.h5\n\
fg\n\
emacs -nw ~/workspace/taosm/apps/sage2h5/main.cc \n\
ls\n\
./sage2h5 -s ./output -p millennium.par -a millennium.a_list -o mini-millennium.h5\n\
emacs -nw millennium.par \n\
./sage2h5 -s ./output -p millennium.par -a millennium.a_list -o mini-millennium.h5\n\
ls\n\
rm *~\n\
ls\n\
ls -al\n\
ls\n\
fg\n\
emacs -nw ~/workspace/taosm/apps/sage2h5/main.cc \n\
ls\n\
cd output/\n\
ls\n\
rm *\n\
cd ..\n\
ls\n\
pushd ../../\n\
make\n\
popd\n\
./sage millennium.par \n\
gdb --args ./sage millennium.par \n\
pushd ../../\n\
make\n\
popd\n\
./sage millennium.par \n\
fg\n\
ls\n\
cd output/\n\
rm *\n\
cd ..\n\
ls\n\
cd ..\n\
ls\n\
make\n\
fg\n\
emacs code/core_save.c \n\
make\n\
cd ..\n\
souce environ-opt.sh \n\
source environ-opt.sh \n\
ls\n\
cd taosm\n\
./use -j 4\n\
cd ..\n\
cd sage\n\
ls\n\
cd ..\n\
cd sage-public/\n\
ls\n\
cd data/\n\
ls\n\
cd mini/\n\
ls\n\
ls output/\n\
./sage millennium.par \n\
ls\n\
./sage2h5 -s ./output -p millennium.par -a millennium.a_list -o mini-millennium.h5\n\
ls\n\
ls -al\n\
h5ls mini-millennium.h5 \n\
cd ..\n\
ls\n\
cd ../taosm\n\
ls\n\
emacs -nw usescript.py \n\
./use -j 4\n\
cd ..\n\
cd sage-public/data/mini/\n\
ls\n\
ln -s /home/lhodkins/workspace/taosm/build/debug/bin/dsinit .\n\
./dsinit -h\n\
emacs -nw /home/lhodkins/workspace/taosm/apps/dsinit/main.cc \n\
cd ..\n\
cd ../sage\n\
ls\n\
cd mini/\n\
ls\n\
cd ..\n\
ls\n\
cd output/\n\
ls\n\
cd ..\n\
ls\n\
cd sage_output/\n\
ls\n\
cd ..\n\
ls\n\
cd ..\n\
cd taosm/apps/dsinit/\n\
ls\n\
emacs main.cc \n\
cd ..\n\
cd sage\n\
cd ../sage-public/\n\
ls\n\
cd data/mini/\n\
ls\n\
h5ls mini-millennium.h5 \n\
fg\n\
ls\n\
./dsinit -m flatten -h\n\
./dsinit -m flatten -s mini-millennium.h5 -o mini-millennium-flat.h5\n\
ls\n\
h5ls mini-millennium-flat.h5 \n\
./dsinit -m init -h\n\
./dsinit -m init -s mini-millennium-flat.h5 -t mini-millennium.h5 -o mini-millennium-kdtree.h5\n\
ls\n\
cd\n\
cd workspace/\n\
ls\n\
ssh taodbadmin@tao01\n\
ssh taoadmin@tao01\n\
ls\n\
cd /lustre/projects/p014_swin/FTP/\n\
ls\n\
cd ..\n\
ls\n\
ls -l\n\
cd raw_data/\n\
ls\n\
cd millennium/mini/\n\
ls\n\
cd hdf5/\n\
ls\n\
mkdir 201505\n\
ls -al\n\
fg\n\
ssh TAODBAdmin@tao01\n\
ssht ao01\n\
ssh tao01\n\
cd workspace/sage-public/\n\
cd code/\n\
grep dT *\n\
pushd ~/workspace/sage\n\
cd code/\n\
grep dT *\n\
grep dt *\n\
ls\n\
emacs core_allvars.h \n\
grep dt *\n\
grep .dt *\n\
grep \.dt *\n\
grep f_delta_t *\n\
emacs core_build_model.c \n\
ls\n\
grep \.dt *\n\
grep \.dT *\n\
grep dT *\n\
fg\n\
emacs core_save.c \n\
ls\n\
grep UnitTime_in_s *\n\
fg\n\
pwd\n\
cd ..\n\
ls\n\
cd sage-public/\n\
cd code/\n\
ls\n\
emacs -nw core_build_model.c \n\
cd\n\
cd workspace/\n\
ls -al\n\
chmod o+wx taosm\n\
cd taosm\n\
ls\n\
ls -a\n\
ls -al\n\
chmod o+wx build/\n\
cd build/\n\
chmod o+wx debug/\n\
cd debug/\n\
ls\n\
chmod o+wx *\n\
ls -al\n\
chmod o-w *\n\
ls -al\n\
cd ..\n\
ls\n\
chmod o-w *\n\
ls\n\
cd ..\n\
chmod o-w build/\n\
ls\n\
cd ..\n\
ls -al\n\
chmod o-w taosm\n\
chmod o+r taosm\n\
ls -al\n\
cd taosm\n\
ls -al\n\
cd build/debug/\n\
ls\n\
ls -al\n\
ls src/\n\
ls include/n\n\
ls include/\n\
ls\n\
ls bin/\n\
cd bin/\n\
ls\n\
ls -al\n\
cd ..\n\
ls\n\
ls -al\n\
cd lib/\n\
ls\n\
ls -al\n\
cd ..\n\
ls\n\
ls -al\n\
chmod o+r environ-*\n\
cd\n\
ssh tao01\n\
cd /lustre/projects/p014_swin/FTP/\n\
ls\n\
cd stagingjobs/\n\
ls\n\
cd max/\n\
ls\n\
cd 270\n\
ls\n\
cd output/\n\
ls\n\
ssh root@g2\n\
cd /lustre/projects/p014_swin/FTP/\n\
ls\n\
find . -iname jobs\n\
find . -type d -name log\n\
find . -type d -name log | xargs ls\n\
find . -type d -name log | xargs -n 1 ls\n\
man ls\n\
ls\n\
ls -l\n\
ls -h\n\
find . -type d -name log | xargs -n 1 ls -1\n\
find . -type d -name log | xargs -n 1 ls -1 | echo chmod o-rwx\n\
find . -type d -name log | xargs -n 1 ls -1 | xargs echo chmod o-rwx\n\
find `pwd` -type d -name log/*\n\
find `pwd` -type d -name log\n\
find `pwd` -type d -name log | xargs -I % echo chmod o-rwx %/* \n\
chmod o-rwx /lustre/projects/p014_swin/FTP/stagingjobs/rybrennan/843/log/*\n\
module avail phosim\n\
module load phosim\n\
ls\n\
which phosim\n\
ls /usr/local/x86_64/gnu/phosim-latest/bin/\n\
which raytrace\n\
raytrace\n\
history\n\
ls\n\
fg\n\
module load phosim\n\
phosim /home/shegarty/phosim/brightstar\n\
mkdir tmp\n\
cd tmp/\n\
phosim /home/shegarty/phosim/brightstar\n\
ls\n\
ssh root@g2\n\
history -w\n\
phosim /home/shegarty/phosim/brightstar\n\
ls\n\
ssh root@g2\n\
history -w\n\
history -s\n\
history -p\n\
history\n\
history | cut -c 8-\n\
history | cut -c 8- > history.txt\n\
history | cut -c 8- | xargs -n 1 -I % echo %  > history.txt\n\
tail history.txt \n\
rm history.txt \n\
history | cut -c 8- | xargs -n 1 -I % echo % \ >> history.txt\n\
history | cut -c 8- | xargs -n 1 -I % echo % \\ >> history.txt\n\
emacs history.txt \n\
history | cut -c 8- | xargs -n 1 -I % echo %\\ >> history.txt\n\
rm history.txt \n\
history | cut -c 8- | xargs -n 1 -I % echo %\\ >> history.txt\n\
history | cut -c 8- | xargs -n 1 -I % %\ >> history.txt\n\
history | cut -c 8- | xargs -n 1 -I % %\\ >> history.txt\n\
history | cut -c 8- | xargs -n 1 -I % echo %\\ >> history.txt\n\
rm history.txt \n\
history | cut -c 8- | xargs -n 1 -I % echo %\\ >> history.txt\n\
emacs -nw history.txt \n\
history | cut -c 8- | xargs -n 1 -I % echo %\ >> history.txt\n\
emacs -nw history.txt \n\
rm history.txt \n\
history | cut -c 8- | xargs -n 1 -I % echo %\ >> history.txt\n\
emacs -nw history.txt \n\
ls\n\
rm history.txt';
